"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
    const { ready, authenticated, user, login, logout } = usePrivy();
    const [synced, setSynced] = useState(false);

    const walletAddress =
        user?.wallet?.address ??
        (user?.linkedAccounts?.find((a) => a.type === "wallet") as any)?.address;

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