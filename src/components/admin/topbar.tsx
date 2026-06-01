"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, User, Settings, LogOut } from "lucide-react";

export default function AdminTopbar() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
            <div className="flex h-[88px] items-center justify-between gap-6 px-8">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 xl:hidden">
                        <Menu size={18} />
                    </button>

                    {/* <div className="hidden items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 lg:flex">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="w-[340px] bg-transparent text-sm outline-none"
                        />
                    </div> */}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    {/* <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200">
                        <Bell size={18} />
                        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                    </button> */}

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-4 rounded-2xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                                رط
                            </div>
                            <div className="hidden lg:block text-right">
                                <h4 className="text-sm font-bold text-slate-900">
                                    رسول طاهری
                                </h4>
                                <p className="mt-1 text-xs text-slate-500">
                                    مدیر سیستم
                                </p>
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg z-10 overflow-hidden">
                                <div className="p-3 border-b border-slate-100">
                                    <p className="text-sm font-semibold text-slate-900">رسول طاهری</p>
                                    <p className="text-xs text-slate-500">rasoul@axismart.com</p>
                                </div>
                                <div className="py-2">
                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                                        <User size={16} />
                                        <span>پروفایل من</span>
                                    </button>
                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition">
                                        <Settings size={16} />
                                        <span>تنظیمات</span>
                                    </button>
                                    <hr className="my-1 border-slate-100" />
                                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                                        <LogOut size={16} />
                                        <span>خروج</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}