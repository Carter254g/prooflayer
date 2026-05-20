import PageWrapper from "@/components/layout/PageWrapper";
import FeedCard from "@/components/proof/FeedCard";
import { MOCK_PROOFS } from "@/lib/mock-data";

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
          <FeedCard key={proof.id} proof={proof} />
        ))}
      </div>
    </PageWrapper>
  );
}