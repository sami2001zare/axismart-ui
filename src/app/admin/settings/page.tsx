// src/app/admin/settings/page.tsx

"use client";

import {
    Save,
    Shield,
    Bell,
    Globe,
    CreditCard,
} from "lucide-react";

export default function SettingsPage() {

    return (

        <div className="space-y-8">

            <div>

                <h1 className="
text-4xl
font-black
text-slate-900
">
                    تنظیمات
                </h1>

                <p className="
mt-3
text-sm
text-slate-500
">
                    مدیریت تنظیمات فروشگاه و سیستم.
                </p>

            </div>

            <div className="
grid
gap-8
xl:grid-cols-[320px_1fr]
">

                {/* MENU */}

                <div className="
rounded-[34px]
border border-slate-200
bg-white
p-5
space-y-3
">

                    <MenuItem
                        icon={<Globe size={16} />}
                        label="عمومی"
                        active
                    />

                    <MenuItem
                        icon={<Bell size={16} />}
                        label="اعلان‌ها"
                    />

                    <MenuItem
                        icon={<Shield size={16} />}
                        label="امنیت"
                    />

                    <MenuItem
                        icon={<CreditCard size={16} />}
                        label="پرداخت"
                    />

                </div>

                {/* CONTENT */}

                <div className="
rounded-[34px]
border border-slate-200
bg-white
overflow-hidden
">

                    <div className="
border-b
border-slate-100
px-8 py-6
">

                        <h3 className="
text-lg
font-bold
text-slate-900
">
                            تنظیمات عمومی
                        </h3>

                    </div>

                    <div className="
p-8
space-y-7
">

                        <Field
                            label="نام فروشگاه"
                            placeholder="AxisMart"
                        />

                        <Field
                            label="ایمیل پشتیبانی"
                            placeholder="support@axismart.com"
                        />

                        <Field
                            label="شماره تماس"
                            placeholder="+98..."
                        />

                        <div>

                            <label className="
mb-4
block
text-sm
font-bold
text-slate-700
">
                                توضیحات
                            </label>

                            <textarea
                                rows={6}
                                className={textarea}
                            />

                        </div>

                        <button className="
inline-flex
items-center
gap-3
rounded-2xl
bg-blue-600
px-6 py-4
text-sm
font-medium
text-white
">

                            <Save size={16} />

                            ذخیره تنظیمات

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

const input = `
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
px-5
py-4
text-sm
outline-none
`;

const textarea = `
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
outline-none
resize-none
`;

function MenuItem({
    icon,
    label,
    active,
}: any) {

    return (

        <button className={`
flex
w-full
items-center
gap-4
rounded-2xl
px-5 py-4
text-sm
font-medium
transition
${active
                ?
                "bg-blue-600 text-white"
                :
                "text-slate-700 hover:bg-slate-100"
            }
`}>

            {icon}

            {label}

        </button>

    );

}

function Field({
    label,
    placeholder,
}: any) {

    return (

        <div>

            <label className="
mb-4
block
text-sm
font-bold
text-slate-700
">
                {label}
            </label>

            <input
                placeholder={placeholder}
                className={input}
            />

        </div>

    );

}