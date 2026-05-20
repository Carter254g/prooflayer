import PageWrapper from "@/components/layout/PageWrapper";
import { MOCK_PROOFS, MOCK_USERS } from "@/lib/mock-data";
import { categoryLabel, timeAgo, shortWallet } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export default function ProfilePage({ params }: { params: { address: string } }) {
  const user = MOCK_USERS.find((u) => u.wallet === params.address) ?? MOCK_USERS[0];
  const userProofs = MOCK_PROOFS.filter((p) => p.creator.id === user.id);
  const totalVerifications = userProofs.reduce((sum, p) => sum + p.verificationCount, 0);

  return (
    <PageWrapper>
      <div className="max-w-2xl">

        {/* Profile header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[#1E1E2A] border border-[#2A2A38] flex items-center justify-center text-xl text-[#6EE7B7]">
            {user.ensName?.[0].toUpperCase() ?? "?"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {user.ensName ?? shortWallet(user.wallet)}
            </h1>
            <p className="text-sm text-[#5C5A72]">{shortWallet(user.wallet)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{userProofs.length}</p>
            <p className="text-xs text-[#5C5A72] mt-1">Proofs Created</p>
          </div>
          <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-xl p-4">
            <p className="text-2xl font-bold text-[#818CF8]">{totalVerifications}</p>
            <p className="text-xs text-[#5C5A72] mt-1">Total Verifications</p>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="text-sm font-semibold text-[#A09EB8] mb-4 uppercase tracking-wider">
          Proof Timeline
        </h2>

        <div className="flex flex-col gap-4">
          {userProofs.map((proof) => (
            <div
              key={proof.id}
              className="border border-[#2A2A38] rounded-xl p-5 bg-[#0F0F17] hover:border-[#3D3D52] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded-md bg-[#1E1E2A] text-[#6EE7B7] border border-[#2A2A38]">
                  {categoryLabel(proof.category)}
                </span>
                <span className="text-xs text-[#5C5A72]">{timeAgo(proof.createdAt)}</span>
              </div>
              <h3 className="text-white font-semibold mb-1">{proof.title}</h3>
              <p className="text-sm text-[#A09EB8] mb-3">{proof.description}</p>
              <div className="flex items-center gap-1 text-xs text-[#A09EB8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#818CF8]" />
                <span>{proof.verificationCount} verifications</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}
