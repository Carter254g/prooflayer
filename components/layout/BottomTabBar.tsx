"use client";

import Link from "next/link";
import { Rss, PlusCircle, User, LogIn } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export default function BottomTabBar() {
    const { authenticated, user, login } = usePrivy();

    const walletAddress = user?.wallet?.address;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0F] border-t border-[#2A2A38] px-4 py-2">
            <div className="flex items-center justify-around">
                <Link
                    href="/feed"
                    className="flex flex-col items-center gap-1 text-[#A09EB8] hover:text-white transition-colors py-1 px-3"
                >
                    <Rss className="w-5 h-5" />
                    <span className="text-xs">Feed</span>
                </Link>

                <Link
                    href="/create"
                    className="flex flex-col items-center gap-1 text-[#A09EB8] hover:text-white transition-colors py-1 px-3"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span className="text-xs">Create</span>
                </Link>

                {authenticated && walletAddress ? (
                    <Link
                        href={`/profile/${walletAddress}`}
                        className="flex flex-col items-center gap-1 text-[#A09EB8] hover:text-white transition-colors py-1 px-3"
                    >
                        <User className="w-5 h-5" />
                        <span className="text-xs">Profile</span>
                    </Link>
                ) : (
                    <button
                        onClick={login}
                        className="flex flex-col items-center gap-1 text-[#A09EB8] hover:text-[#6EE7B7] transition-colors py-1 px-3"
                    >
                        <LogIn className="w-5 h-5" />
                        <span className="text-xs">Connect</span>
                    </button>
                )}
            </div>
        </nav>
    );
}