import PageWrapper from "@/components/layout/PageWrapper";
import { MOCK_PROOFS } from "@/lib/mock-data";
import { categoryLabel, timeAgo, shortWallet } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export default function FeedPage() {
  return (
    <PageWrapper>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Proof Feed</h1>
        <p className="text-[#A09EB8] text-sm mt-1">
          Real work, verified on-chain.
        </p>
      </div>

      {/* Proof Cards */}
      <div className="flex flex-col gap-4">
        {MOCK_PROOFS.map((proof) => (
          <div
            key={proof.id}
            className="border border-[#2A2A38] rounded-xl p-5 bg-[#0F0F17] hover:border-[#3D3D52] transition-all"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1E1E2A] border border-[#2A2A38] flex items-center justify-center text-xs text-[#6EE7B7]">
                  {proof.creator.ensName?.[0].toUpperCase() ?? "?"}
                </div>
                <span className="text-sm text-[#A09EB8]">
                  {proof.creator.ensName ?? shortWallet(proof.creator.wallet)}
                </span>
              </div>
              <span className="text-xs text-[#5C5A72]">
                {timeAgo(proof.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-white font-semibold mb-1">{proof.title}</h2>

            {/* Description */}
            <p className="text-sm text-[#A09EB8] mb-4">{proof.description}</p>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded-md bg-[#1E1E2A] text-[#6EE7B7] border border-[#2A2A38]">
                {categoryLabel(proof.category)}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#A09EB8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#818CF8]" />
                <span>{proof.verificationCount} verifications</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}