import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={cn('h-full', 'antialiased', 'yekan')}>
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
