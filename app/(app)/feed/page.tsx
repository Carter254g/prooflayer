import PageWrapper from "@/components/layout/PageWrapper";
import FeedCard from "@/components/proof/FeedCard";
import { getProofs } from "@/lib/supabase/api";
import { MOCK_PROOFS } from "@/lib/mock-data";

export default async function FeedPage() {
  let proofs = await getProofs();

  if (proofs.length === 0) {
    proofs = MOCK_PROOFS;
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Proof Feed</h1>
        <p className="text-[#A09EB8] text-sm mt-1">
          Real work, verified on-chain.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {proofs.length === 0 ? (
          <p className="text-[#5C5A72] text-sm">No proofs yet. Be the first.</p>
        ) : (
          proofs.map((proof) => <FeedCard key={proof.id} proof={proof} />)
        )}
      </div>
    </PageWrapper>
  );
}
