import Navbar from "./Navbar";

export default function PageWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0F]">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 pt-20 pb-12">{children}</main>
        </div>
    );
}