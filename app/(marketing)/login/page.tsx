"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/feed";

  useEffect(() => {
    if (ready && authenticated) {
      router.push(redirect);
    }
  }, [ready, authenticated, redirect, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="flex items-center justify-center gap-2 mb-8">
          <ShieldCheck className="w-6 h-6 text-[#6EE7B7]" />
          <span className="text-xl font-bold text-white">ProofLayer</span>
        </div>

        <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-2xl p-8 text-center">
          <h1 className="text-white font-bold text-xl mb-2">Welcome back</h1>
          <p className="text-[#A09EB8] text-sm mb-8">
            Sign in to create and verify proofs of real-world work.
          </p>

          <button
            onClick={login}
            className="w-full bg-[#6EE7B7] hover:bg-[#34D399] text-[#0A0A0F] font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            Sign In
          </button>

          <p className="text-xs text-[#5C5A72] mt-4">
            Email or wallet — your choice.
          </p>
        </div>

      </div>
    </div>
  );
}
