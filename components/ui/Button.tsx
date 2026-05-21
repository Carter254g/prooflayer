import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "verify";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-[#6EE7B7] hover:bg-[#34D399] text-[#0A0A0F]": variant === "primary",
          "bg-[#1E1E2A] hover:bg-[#272735] text-white border border-[#2A2A38]": variant === "secondary",
          "border border-[#2A2A38] hover:border-[#6EE7B7] text-[#A09EB8] hover:text-[#6EE7B7] bg-transparent": variant === "outline",
          "text-[#A09EB8] hover:text-white hover:bg-[#1E1E2A] bg-transparent": variant === "ghost",
          "border border-[#818CF8] text-[#818CF8] hover:bg-[#818CF8] hover:text-white": variant === "verify",
          "text-xs px-3 py-1.5": size === "sm",
          "text-sm px-4 py-2.5": size === "md",
          "text-base px-6 py-3": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
