import PageWrapper from "@/components/layout/PageWrapper";
import { getProofById } from "@/lib/supabase/api";
import { MOCK_PROOFS } from "@/lib/mock-data";
import { categoryLabel, timeAgo, shortWallet } from "@/lib/utils";
import { ShieldCheck, ExternalLink } from "lucide-react";

export default async function ProofPage({
  params,
}: {
  params: { id: string };
}) {
  let proof = await getProofById(params.id);

  if (!proof) {
    proof = MOCK_PROOFS.find((p) => p.id === params.id) ?? MOCK_PROOFS[0];
  }

  const explorerUrl = "https://explorer.pharos.network/tx/" + proof.txHash;

  return (
    <PageWrapper>
      <div className="max-w-2xl">

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#1E1E2A] border border-[#2A2A38] flex items-center justify-center text-sm text-[#6EE7B7]">
            {proof.creator.ensName?.[0].toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-sm text-white">
              {proof.creator.ensName ?? shortWallet(proof.creator.wallet)}
            </p>
            <p className="text-xs text-[#5C5A72]">{timeAgo(proof.createdAt)}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">{proof.title}</h1>

        <span className="text-xs px-2 py-1 rounded-md bg-[#1E1E2A] text-[#6EE7B7] border border-[#2A2A38]">
          {categoryLabel(proof.category)}
        </span>

        <p className="text-sm text-[#A09EB8] mt-4 mb-6">{proof.description}</p>

        {proof.mediaUrls.length > 0 && (
          <div className="rounded-xl overflow-hidden border border-[#2A2A38] mb-6">
            <img
              src={proof.mediaUrls[0]}
              alt={proof.title}
              className="w-full object-cover max-h-80"
            />
          </div>
        )}

        <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-xl p-4 mb-6">
          <p className="text-xs text-[#5C5A72] mb-1">On-chain status</p>
          <div className="flex items-center justify-between">
            <span className={proof.status === "anchored" ? "text-sm font-medium text-[#6EE7B7]" : proof.status === "pending" ? "text-sm font-medium text-yellow-400" : "text-sm font-medium text-[#5C5A72]"}>
              {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
            </span>
            {proof.txHash && (
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#818CF8] hover:underline">
                View tx <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#818CF8]" />
            <p className="text-sm text-white font-medium">
              {proof.verificationCount} Verifications
            </p>
          </div>
          <p className="text-xs text-[#5C5A72]">
            Verified by {proof.verificationCount} unique wallets on-chain.
          </p>
        </div>

        <button className="w-full border border-[#818CF8] text-[#818CF8] hover:bg-[#818CF8] hover:text-white font-semibold rounded-lg py-2.5 text-sm transition-all">
          Verify this Proof
        </button>

      </div>
    </PageWrapper>
  );
}