import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A38] bg-[#0A0A0F]/80 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#6EE7B7]" />
                    <span className="font-bold text-white text-sm tracking-wide">
                        ProofLayer
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/feed"
                        className="text-sm text-[#A09EB8] hover:text-white transition-colors"
                    >
                        Feed
                    </Link>
                    <Link
                        href="/create"
                        className="text-sm text-[#A09EB8] hover:text-white transition-colors"
                    >
                        Create
                    </Link>
                </div>

                {/* Wallet Button placeholder */}
                <button className="text-sm px-4 py-1.5 rounded-lg border border-[#2A2A38] text-[#A09EB8] hover:border-[#6EE7B7] hover:text-[#6EE7B7] transition-all">
                    Connect Wallet
                </button>

            </div>
        </nav>
    );
}