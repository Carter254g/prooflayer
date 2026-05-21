"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={{
                loginMethods: ["email", "wallet"],
                appearance: {
                    theme: "dark",
                    accentColor: "#6EE7B7",
                    logo: "https://your-logo-url.com/logo.png",
                },
                embeddedWallets: {
                    createOnLogin: "users-without-wallets",
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}