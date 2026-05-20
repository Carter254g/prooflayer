import Link from "next/link";
import { Rss, PlusCircle, User } from "lucide-react";

const TAB_ITEMS = [
    { label: "Feed", href: "/feed", icon: Rss },
    { label: "Create", href: "/create", icon: PlusCircle },
    { label: "Profile", href: "/profile/0x1234567890abcdef1234567890abcdef12345678", icon: User },
];

export default function BottomTabBar() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0F] border-t border-[#2A2A38] px-4 py-2">
            <div className="flex items-center justify-around">
                {TAB_ITEMS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="flex flex-col items-center gap-1 text-[#A09EB8] hover:text-white transition-colors py-1 px-3"
                    >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}