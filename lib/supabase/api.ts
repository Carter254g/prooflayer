import { createClient } from "./server";
import { Proof, User, Verification } from "@/types";

// ─── USERS ───────────────────────────────────────────

export async function getUser(wallet: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("wallet", wallet)
        .single();

    if (error || !data) return null;

    return {
        id: data.id,
        wallet: data.wallet,
        ensName: data.ens_name ?? undefined,
        avatarUrl: data.avatar_url ?? undefined,
        createdAt: data.created_at,
    };
}

export async function upsertUser(wallet: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .upsert({ wallet }, { onConflict: "wallet" })
        .select()
        .single();

    if (error || !data) return null;

    return {
        id: data.id,
        wallet: data.wallet,
        ensName: data.ens_name ?? undefined,
        avatarUrl: data.avatar_url ?? undefined,
        createdAt: data.created_at,
    };
}

// ─── PROOFS ───────────────────────────────────────────

export async function getProofs(): Promise<Proof[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("proofs")
        .select("*, users!creator(*)")
        .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map(mapProof);
}

export async function getProofsByWallet(wallet: string): Promise<Proof[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("proofs")
        .select("*, users!creator(*)")
        .eq("creator", wallet)
        .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map(mapProof);
}

export async function getProofById(id: string): Promise<Proof | null> {
    const supabase = await createClient();

    console.log("getProofById called with id:", id);

    const { data, error } = await supabase
        .from("proofs")
        .select("*, users!creator(*)")
        .eq("id", id)
        .single();

    console.log("getProofById result:", { data, error });

    if (error || !data) return null;

    return mapProof(data);
}

// ─── VERIFICATIONS ────────────────────────────────────

export async function getVerifications(proofId: string): Promise<Verification[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("verifications")
        .select("*, users!verifier(*)")
        .eq("proof_id", proofId)
        .order("verified_at", { ascending: false });

    if (error || !data) return [];

    return data.map((v) => ({
        id: v.id,
        proofId: v.proof_id,
        verifier: {
            id: v.users.id,
            wallet: v.users.wallet,
            ensName: v.users.ens_name ?? undefined,
            avatarUrl: v.users.avatar_url ?? undefined,
            createdAt: v.users.created_at,
        },
        txHash: v.tx_hash,
        verifiedAt: v.verified_at,
    }));
}

// ─── HELPERS ──────────────────────────────────────────

function mapProof(data: any): Proof {
    return {
        id: data.id,
        creator: {
            id: data.users.id,
            wallet: data.users.wallet,
            ensName: data.users.ens_name ?? undefined,
            avatarUrl: data.users.avatar_url ?? undefined,
            createdAt: data.users.created_at,
        },
        title: data.title,
        category: data.category,
        categoryGroup: data.category_group,
        description: data.description,
        mediaUrls: data.media_urls ?? [],
        txHash: data.tx_hash ?? undefined,
        status: data.status,
        verificationCount: data.verification_count,
        createdAt: data.created_at,
    };
}