import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html className={cn("h-full", "antialiased", "yekan")}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}