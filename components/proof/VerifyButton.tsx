"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface VerifyButtonProps {
    proofId: string;
    creatorWallet: string;
}

export default function VerifyButton({ proofId, creatorWallet }: VerifyButtonProps) {
    console.log("VerifyButton proofId:", proofId);

    const { authenticated, walletAddress, login } = useAuth();
    const [hasVerified, setHasVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState<number | null>(null);

    const isOwner = walletAddress?.toLowerCase() === creatorWallet?.toLowerCase();

    useEffect(() => {
        if (!walletAddress) { setChecking(false); return; }

        async function checkVerification() {
            setChecking(true);
            try {
                const res = await fetch(
                    `/api/verifications?proof_id=${proofId}&verifier=${walletAddress}`
                );
                const data = await res.json();
                setHasVerified(data.hasVerified);
                setCount(data.verifications?.length ?? null);
            } catch {
                // ignore
            } finally {
                setChecking(false);
            }
        }

        checkVerification();
    }, [proofId, walletAddress]);

    async function handleVerify() {
        if (!authenticated) { login(); return; }
        if (hasVerified || isOwner) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/verifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ proof_id: proofId, verifier: walletAddress }),
            });

            const data = await res.json();

            if (res.status === 409) {
                setHasVerified(true);
                return;
            }

            if (!res.ok) throw new Error(data.error);

            setHasVerified(true);
            setCount((prev) => (prev ?? 0) + 1);
        } catch (err: any) {
            setError(err.message ?? "Verification failed");
        } finally {
            setLoading(false);
        }
    }

    if (isOwner) {
        return (
            <div className="w-full border border-[#2A2A38] text-[#5C5A72] font-semibold rounded-lg py-2.5 text-sm text-center">
                You can't verify your own proof
            </div>
        );
    }

    if (hasVerified) {
        return (
            <div className="w-full border border-[#6EE7B7] text-[#6EE7B7] font-semibold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                You verified this proof
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleVerify}
                disabled={loading || checking}
                className="w-full border border-[#818CF8] text-[#818CF8] hover:bg-[#818CF8] hover:text-white font-semibold rounded-lg py-2.5 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : !authenticated ? (
                    "Connect Wallet to Verify"
                ) : (
                    <><ShieldCheck className="w-4 h-4" /> Verify this Proof</>
                )}
            </button>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
        </div>
    );
}