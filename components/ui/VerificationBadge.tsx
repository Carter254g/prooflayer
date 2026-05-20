import { ShieldCheck, ShieldX, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
    count: number;
    status: "anchored" | "pending" | "draft";
    showLabel?: boolean;
}

export default function VerificationBadge({
    count,
    status,
    showLabel = true,
}: VerificationBadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium",
                {
                    "bg-[#1E1B4B] border-[#818CF8]/30 text-[#818CF8]":
                        status === "anchored" && count > 0,
                    "bg-[#1E1E2A] border-[#2A2A38] text-[#5C5A72]":
                        status === "anchored" && count === 0,
                    "bg-yellow-900/20 border-yellow-400/20 text-yellow-400":
                        status === "pending",
                    "bg-[#1E1E2A] border-[#2A2A38] text-[#5C5A72]": status === "draft",
                }
            )}
        >
            {status === "anchored" && count > 0 ? (
                <ShieldCheck className="w-3.5 h-3.5" />
            ) : status === "pending" ? (
                <Shield className="w-3.5 h-3.5" />
            ) : (
                <ShieldX className="w-3.5 h-3.5" />
            )}
            {showLabel && (
                <span>
                    {count > 0 ? `${count} verified` : status === "pending" ? "Pending" : "Unverified"}
                </span>
            )}
        </div>
    );
}