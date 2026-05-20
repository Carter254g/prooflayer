import PageWrapper from "@/components/layout/PageWrapper";
import ProfileHeader from "@/components/proof/ProfileHeader";
import FeedCard from "@/components/proof/FeedCard";
import { MOCK_PROOFS, MOCK_USERS } from "@/lib/mock-data";

export default function ProfilePage({
  params,
}: {
  params: { address: string };
}) {
  const user =
    MOCK_USERS.find((u) => u.wallet === params.address) ?? MOCK_USERS[0];
  const userProofs = MOCK_PROOFS.filter((p) => p.creator.id === user.id);

  return (
    <PageWrapper>
      <div className="max-w-2xl">
        <ProfileHeader user={user} proofs={userProofs} />

        <h2 className="text-sm font-semibold text-[#A09EB8] mb-4 uppercase tracking-wider">
          Proof Timeline
        </h2>

        <div className="flex flex-col gap-4">
          {userProofs.map((proof) => (
            <FeedCard key={proof.id} proof={proof} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}