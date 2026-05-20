export type CategoryGroup =
    | "creative"
    | "tech"
    | "field_logistics"
    | "agriculture"
    | "construction_trades"
    | "services"
    | "healthcare_education";

export type Category =
    // Creative
    | "photography"
    | "videography"
    | "graphic_design"
    | "writing"
    | "music_production"
    // Tech
    | "development"
    | "ui_ux_design"
    | "data_analysis"
    | "devops"
    // Field & Logistics
    | "delivery"
    | "transportation"
    | "warehousing"
    | "security"
    // Agriculture
    | "farming"
    | "livestock"
    | "harvesting"
    | "irrigation"
    // Construction & Trades
    | "construction"
    | "plumbing"
    | "electrical"
    | "carpentry"
    | "painting"
    // Services
    | "cleaning"
    | "catering"
    | "event_staffing"
    | "tailoring"
    | "barbering"
    // Healthcare & Education
    | "tutoring"
    | "caregiving"
    | "community_health";

export const CATEGORY_GROUPS: Record<CategoryGroup, Category[]> = {
    creative: ["photography", "videography", "graphic_design", "writing", "music_production"],
    tech: ["development", "ui_ux_design", "data_analysis", "devops"],
    field_logistics: ["delivery", "transportation", "warehousing", "security"],
    agriculture: ["farming", "livestock", "harvesting", "irrigation"],
    construction_trades: ["construction", "plumbing", "electrical", "carpentry", "painting"],
    services: ["cleaning", "catering", "event_staffing", "tailoring", "barbering"],
    healthcare_education: ["tutoring", "caregiving", "community_health"],
};

export type ProofStatus = "draft" | "pending" | "anchored";

export interface User {
    id: string;
    wallet: string;
    ensName?: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface Proof {
    id: string;
    creator: User;
    title: string;
    category: Category;
    categoryGroup: CategoryGroup;
    description: string;
    mediaUrls: string[];
    txHash?: string;
    status: ProofStatus;
    verificationCount: number;
    createdAt: string;
}

export interface Verification {
    id: string;
    proofId: string;
    verifier: User;
    txHash: string;
    verifiedAt: string;
}