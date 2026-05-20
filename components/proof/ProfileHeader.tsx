import { ShieldCheck } from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import { User, Proof } from "@/types";
import { shortWallet } from "@/lib/utils";

interface ProfileHeaderProps {
    user: User;
    proofs: Proof[];
}

export default function ProfileHeader({ user, proofs }: ProfileHeaderProps) {
    const totalVerifications = proofs.reduce(
        (sum, p) => sum + p.verificationCount,
        0
    );
    const anchoredProofs = proofs.filter((p) => p.status === "anchored").length;

    return (
        <div className="mb-8">
            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#1E1E2A] border-2 border-[#2A2A38] flex items-center justify-center text-2xl text-[#6EE7B7] font-bold">
                    {user.ensName?.[0].toUpperCase() ?? "?"}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">
                        {user.ensName ?? shortWallet(user.wallet)}
                    </h1>
                    <p className="text-sm text-[#5C5A72] font-mono">
                        {shortWallet(user.wallet)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#818CF8]" />
                        <span className="text-xs text-[#818CF8]">
                            {totalVerifications} verifications received
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
                <StatsCard label="Proofs Created" value={proofs.length} accent="default" />
                <StatsCard label="Anchored On-chain" value={anchoredProofs} accent="proof" />
                <StatsCard label="Total Verifications" value={totalVerifications} accent="verify" />
            </div>
        </div>
    );
}