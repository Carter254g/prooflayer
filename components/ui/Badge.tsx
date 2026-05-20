import { cn } from "@/lib/utils";

type Variant = "proof" | "verify" | "status" | "category";
type Status = "anchored" | "pending" | "draft";

interface BadgeProps {
    variant?: Variant;
    status?: Status;
    className?: string;
    children: React.ReactNode;
}

export default function Badge({
    variant = "category",
    status,
    className,
    children,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center text-xs px-2 py-1 rounded-md font-medium border",
                {
                    // Category default
                    "bg-[#1E1E2A] text-[#6EE7B7] border-[#2A2A38]": variant === "category",
                    // Proof accent
                    "bg-[#064E3B] text-[#6EE7B7] border-[#6EE7B7]/20": variant === "proof",
                    // Verify accent
                    "bg-[#1E1B4B] text-[#818CF8] border-[#818CF8]/20": variant === "verify",
                    // Status
                    "bg-[#064E3B] text-[#6EE7B7] border-[#6EE7B7]/20":
                        variant === "status" && status === "anchored",
                    "bg-yellow-900/30 text-yellow-400 border-yellow-400/20":
                        variant === "status" && status === "pending",
                    "bg-[#1E1E2A] text-[#5C5A72] border-[#2A2A38]":
                        variant === "status" && status === "draft",
                },
                className
            )}
        >
            {children}
        </span>
    );
}