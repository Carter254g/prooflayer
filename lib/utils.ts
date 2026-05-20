import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { Category, CategoryGroup } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function timeAgo(date: string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function shortWallet(wallet: string): string {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

export function categoryLabel(category: Category): string {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function groupLabel(group: CategoryGroup): string {
    return group.replace(/_/g, " & ").replace(/\b\w/g, (l) => l.toUpperCase());
}