"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {

    const items = [
        "خانه",
        "محصولات",
        "خرید عمده",
        "درباره ما",
    ];

    return (
        <motion.header
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 " >

            <div className="mx-auto max-w-[1450px]">
                <div className=" flex h-[82px] items-center justify-between px-8 ">
                    <Link href="/" className="flex items-center gap-4" >
                        <div className=" flex h-11 w-11 items-center justify-center bg-blue-600 text-white font-bold ">
                            ⚙
                        </div>
                        <div>
                            <h1 className="font-black text-slate-900">
                                بلبرینگ پارسا
                            </h1>

                            {/* <p className="text-xs text-slate-500">
                                Industrial Marketplace
                            </p> */}
                        </div>
                    </Link>

                    <nav className="hidden lg:flex gap-12">
                        {items.map((item) => (
                            <Link
                                key={item}
                                href="/"
                                className=" text-slate-600 transition hover:text-blue-600 "
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className=" flex h-11 w-11 items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 ">
                            <ShoppingCart size={18} />
                        </button>

                        <button className=" flex items-center gap-2 bg-blue-600 px-5 py-3 text-sm text-white font-medium hover:bg-blue-700 transition ">
                            <User size={16} />
                            ورود
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}