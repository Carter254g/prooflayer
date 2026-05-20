import { Proof, User } from "@/types";

export const MOCK_USERS: User[] = [
    {
        id: "1",
        wallet: "0x1234567890abcdef1234567890abcdef12345678",
        ensName: "carter.eth",
        avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=carter",
        createdAt: "2024-01-15T10:00:00Z",
    },
    {
        id: "2",
        wallet: "0xabcdef1234567890abcdef1234567890abcdef12",
        ensName: "amara.eth",
        avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=amara",
        createdAt: "2024-02-10T08:30:00Z",
    },
    {
        id: "3",
        wallet: "0x9876543210fedcba9876543210fedcba98765432",
        ensName: "james.eth",
        avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=james",
        createdAt: "2024-03-05T14:20:00Z",
    },
];

export const MOCK_PROOFS: Proof[] = [
    {
        id: "1",
        creator: MOCK_USERS[0],
        title: "Wedding Photography — Nairobi, March 2025",
        category: "photography",
        categoryGroup: "creative",
        description:
            "Full day wedding shoot. 400+ edited photos delivered to client within 5 days.",
        mediaUrls: [
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800",
        ],
        txHash: "0xabc123",
        status: "anchored",
        verificationCount: 12,
        createdAt: "2025-03-10T09:00:00Z",
    },
    {
        id: "2",
        creator: MOCK_USERS[1],
        title: "E-commerce Website — Completed Sprint",
        category: "development",
        categoryGroup: "tech",
        description:
            "Built full checkout flow with Stripe integration. Deployed to production.",
        mediaUrls: [
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
        ],
        txHash: "0xdef456",
        status: "anchored",
        verificationCount: 8,
        createdAt: "2025-03-15T11:30:00Z",
    },
    {
        id: "3",
        creator: MOCK_USERS[2],
        title: "50 Deliveries Completed — Westlands Route",
        category: "delivery",
        categoryGroup: "field_logistics",
        description:
            "Completed 50 package deliveries across Westlands. Zero complaints, on-time rate 98%.",
        mediaUrls: [
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
        ],
        status: "pending",
        verificationCount: 3,
        createdAt: "2025-03-18T07:45:00Z",
    },
    {
        id: "4",
        creator: MOCK_USERS[0],
        title: "Maize Harvest — 2 Acres, Nakuru",
        category: "harvesting",
        categoryGroup: "agriculture",
        description:
            "Completed maize harvest on 2-acre farm. Yield: 18 bags. Documented with photos.",
        mediaUrls: [
            "https://images.unsplash.com/photo-1601593346740-925612772716?w=800",
        ],
        status: "anchored",
        verificationCount: 5,
        createdAt: "2025-03-20T06:00:00Z",
    },
];