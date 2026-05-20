export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    wallet: string;
                    ens_name: string | null;
                    avatar_url: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    wallet: string;
                    ens_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    wallet?: string;
                    ens_name?: string | null;
                    avatar_url?: string | null;
                    created_at?: string;
                };
            };
            proofs: {
                Row: {
                    id: string;
                    creator: string;
                    title: string;
                    category: string;
                    category_group: string;
                    description: string;
                    media_urls: string[];
                    tx_hash: string | null;
                    status: string;
                    verification_count: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    creator: string;
                    title: string;
                    category: string;
                    category_group: string;
                    description: string;
                    media_urls?: string[];
                    tx_hash?: string | null;
                    status?: string;
                    verification_count?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    creator?: string;
                    title?: string;
                    category?: string;
                    category_group?: string;
                    description?: string;
                    media_urls?: string[];
                    tx_hash?: string | null;
                    status?: string;
                    verification_count?: number;
                    created_at?: string;
                };
            };
            verifications: {
                Row: {
                    id: string;
                    proof_id: string;
                    verifier: string;
                    tx_hash: string;
                    verified_at: string;
                };
                Insert: {
                    id?: string;
                    proof_id: string;
                    verifier: string;
                    tx_hash: string;
                    verified_at?: string;
                };
                Update: {
                    id?: string;
                    proof_id?: string;
                    verifier?: string;
                    tx_hash?: string;
                    verified_at?: string;
                };
            };
        };
    };
}