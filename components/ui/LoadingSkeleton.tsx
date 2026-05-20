import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-[#1E1E2A]",
                className
            )}
        />
    );
}

export function FeedCardSkeleton() {
    return (
        <div className="border border-[#2A2A38] rounded-xl p-5 bg-[#0F0F17]">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-7 h-7 rounded-full" />
                    <Skeleton className="w-24 h-3" />
                </div>
                <Skeleton className="w-16 h-3" />
            </div>
            <Skeleton className="w-3/4 h-4 mb-2" />
            <Skeleton className="w-full h-3 mb-1" />
            <Skeleton className="w-2/3 h-3 mb-4" />
            <Skeleton className="w-full h-40 mb-4 rounded-lg" />
            <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-5 rounded-md" />
                <Skeleton className="w-16 h-5 rounded-md" />
            </div>
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-24 h-3" />
                    <Skeleton className="w-40 h-3" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
            </div>
        </div>
    );
}

export default Skeleton;