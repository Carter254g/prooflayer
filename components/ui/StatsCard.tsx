import { cn } from "@/lib/utils";

interface StatsCardProps {
    label: string;
    value: string | number;
    accent?: "proof" | "verify" | "default";
}

export default function StatsCard({
    label,
    value,
    accent = "default",
}: StatsCardProps) {
    return (
        <div className="bg-[#0F0F17] border border-[#2A2A38] rounded-xl p-4">
            <p
                className={cn("text-2xl font-bold", {
                    "text-white": accent === "default",
                    "text-[#6EE7B7]": accent === "proof",
                    "text-[#818CF8]": accent === "verify",
                })}
            >
                {value}
            </p>
            <p className="text-xs text-[#5C5A72] mt-1">{label}</p>
        </div>
    );
}