import Sidebar from "./Sidebar";
import BottomTabBar from "./BottomTabBar";

export default function PageWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0F]">
            {/* Sidebar — desktop only */}
            <Sidebar />

            {/* Main content — offset by sidebar width on desktop */}
            <main className="md:ml-56 px-4 pt-8 pb-24 md:pb-12 max-w-3xl mx-auto md:mx-0">
                {children}
            </main>

            {/* Bottom tab bar — mobile only */}
            <BottomTabBar />
        </div>
    );
}