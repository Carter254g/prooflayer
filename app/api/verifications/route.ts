import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { proof_id, verifier } = await request.json();

        if (!proof_id || !verifier) {
            return NextResponse.json({ error: "Missing proof_id or verifier" }, { status: 400 });
        }

        // Check for duplicate
        const { data: existing } = await supabase
            .from("verifications")
            .select("id")
            .eq("proof_id", proof_id)
            .eq("verifier", verifier)
            .single();

        if (existing) {
            return NextResponse.json({ error: "Already verified" }, { status: 409 });
        }

        // Insert verification
        const { error: insertError } = await supabase
            .from("verifications")
            .insert({ proof_id, verifier });

        if (insertError) throw insertError;

        // Increment verification_count on proof
        const { data: proof, error: countError } = await supabase
            .from("proofs")
            .select("verification_count")
            .eq("id", proof_id)
            .single();

        if (!countError && proof) {
            await supabase
                .from("proofs")
                .update({ verification_count: (proof.verification_count ?? 0) + 1 })
                .eq("id", proof_id);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message ?? "Failed to verify" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const proof_id = searchParams.get("proof_id");
        const verifier = searchParams.get("verifier");

        if (!proof_id) {
            return NextResponse.json({ error: "Missing proof_id" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("verifications")
            .select("id, verifier, verified_at")
            .eq("proof_id", proof_id)
            .order("verified_at", { ascending: false });

        if (error) throw error;

        const hasVerified = verifier
            ? data.some((v) => v.verifier === verifier)
            : false;

        return NextResponse.json({ verifications: data, hasVerified });
    } catch (error: any) {
        return NextResponse.json({ error: error.message ?? "Failed to fetch" }, { status: 500 });
    }
}