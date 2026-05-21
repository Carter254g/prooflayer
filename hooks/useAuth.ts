"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
    const { ready, authenticated, user, login, logout } = usePrivy();
    const { wallets } = useWallets();
    const [synced, setSynced] = useState(false);

    const walletAddress = wallets?.[0]?.address ?? user?.wallet?.address;
    console.log("wallets:", wallets, "user wallet:", user?.wallet);
    useEffect(() => {
        if (!ready || !authenticated || !walletAddress || synced) return;

        async function syncUser() {
            const supabase = createClient();
            await supabase
                .from("users")
                .upsert({ wallet: walletAddress }, { onConflict: "wallet" });
            setSynced(true);
        }

        syncUser();
    }, [ready, authenticated, walletAddress, synced]);

    return {
        ready,
        authenticated,
        user,
        walletAddress,
        login,
        logout,
    };
}