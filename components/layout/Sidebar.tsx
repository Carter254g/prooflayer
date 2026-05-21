"use client";

import Link from "next/link";
import { ShieldCheck, Rss, PlusCircle, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
    { label: "Feed", href: "/feed", icon: Rss },
    { label: "Create", href: "/create", icon: PlusCircle },
];

export default function Sidebar() {
    const { ready, authenticated, user, walletAddress, login, logout } = useAuth();


    const shortAddress = walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : null;

    return (
        <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-56 border-r border-[#2A2A38] bg-[#0A0A0F] px-3 py-6 z-50">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 px-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-[#6EE7B7]" />
                <span className="font-bold text-white tracking-wide">ProofLayer</span>
            </Link>

            {/* Nav items */}
            <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#A09EB8] hover:text-white hover:bg-[#1E1E2A] transition-all text-sm font-medium"
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </Link>
                ))}

                {authenticated && walletAddress && (
                    <Link
                        href={`/profile/${walletAddress}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#A09EB8] hover:text-white hover:bg-[#1E1E2A] transition-all text-sm font-medium"
                    >
                        <User className="w-4 h-4" />
                        Profile
                    </Link>
                )}
            </nav>

            {/* Auth button */}
            {!ready ? null : authenticated ? (
                <div className="flex flex-col gap-2">
                    {shortAddress && (
                        <p className="text-xs text-[#5C5A72] px-3 font-mono">{shortAddress}</p>
                    )}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#2A2A38] text-[#A09EB8] hover:border-red-500 hover:text-red-400 transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={login}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#2A2A38] text-[#A09EB8] hover:border-[#6EE7B7] hover:text-[#6EE7B7] transition-all text-sm font-medium"
                >
                    <ShieldCheck className="w-4 h-4" />
                    Connect
                </button>
            )}

        </aside>
    );
}