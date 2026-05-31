// src/app/admin/layout.tsx

import AdminSidebar from "@/components/admin/sidebar";
import AdminTopbar from "@/components/admin/topbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <div className="
min-h-screen
bg-slate-50
">

            <div className="
flex
min-h-screen
">

                <AdminSidebar />

                <div className="
flex
flex-1
flex-col
overflow-hidden
">

                    <AdminTopbar />

                    <main className="
flex-1
p-8
">

                        {children}

                    </main>

                </div>

            </div>

        </div>

    );

}