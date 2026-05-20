import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Proof } from "@/types";
import { categoryLabel, timeAgo, shortWallet } from "@/lib/utils";

interface FeedCardProps {
    proof: Proof;
}

export default function FeedCard({ proof }: FeedCardProps) {
    return (
        <Link href={`/proof/${proof.id}`}>
            <div className="border border-[#2A2A38] rounded-xl p-5 bg-[#0F0F17] hover:border-[#3D3D52] hover:bg-[#16161F] transition-all cursor-pointer">

                {/* Top row — creator + time */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1E1E2A] border border-[#2A2A38] flex items-center justify-center text-xs text-[#6EE7B7] font-medium">
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
                <p className="text-sm text-[#A09EB8] mb-4 line-clamp-2">
                    {proof.description}
                </p>

                {/* Media preview */}
                {proof.mediaUrls.length > 0 && (
                    <div className="rounded-lg overflow-hidden mb-4 border border-[#2A2A38]">
                        <img
                            src={proof.mediaUrls[0]}
                            alt={proof.title}
                            className="w-full object-cover max-h-48"
                        />
                    </div>
                )}

                {/* Bottom row — category + verifications + status */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="category">{categoryLabel(proof.category)}</Badge>
                        <Badge variant="status" status={proof.status}>
                            {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#A09EB8]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#818CF8]" />
                        <span>{proof.verificationCount}</span>
                    </div>
                </div>

            </div>
        </Link>
    );
}