// src/app/customer/addresses/page.tsx

"use client";

import {
    Plus,
    MapPin,
    Edit3,
    Trash2,
    Check,
} from "lucide-react";

export default function AddressesPage() {

    return (

        <div className="space-y-8">

            <div className="
flex
flex-col
gap-6
xl:flex-row
xl:items-center
xl:justify-between
">

                <div>

                    <h1 className="
text-4xl
font-black
text-slate-900
">
                        آدرس‌ها
                    </h1>

                    <p className="
mt-3
text-sm
text-slate-500
">
                        مدیریت آدرس‌های ارسال و صورتحساب.
                    </p>

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

                    <Plus size={16} />

                    آدرس جدید

                </button>

            </div>

            <div className="
grid
gap-6
xl:grid-cols-2
">

                <AddressCard
                    defaultAddress
                    title="دفتر مرکزی"
                    address="تهران، خیابان آزادی، کوچه ۱۲، پلاک ۸"
                />

                <AddressCard
                    title="انبار"
                    address="کرج، جاده مخصوص، شهرک صنعتی"
                />

            </div>

        </div>

    );

}

function AddressCard({
    title,
    address,
    defaultAddress,
}: any) {

    return (

        <div className="
rounded-[34px]
border border-slate-200
bg-white
p-8
">

            <div className="
flex
items-center
justify-between
">

                <div className="
flex
items-center
gap-4
">

                    <div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-700
">

                        <MapPin size={20} />

                    </div>

                    <div>

                        <h3 className="
font-bold
text-slate-900
">
                            {title}
                        </h3>

                        {defaultAddress && (

                            <div className="
mt-3
inline-flex
items-center
gap-2
rounded-full
bg-emerald-50
px-4 py-2
text-xs
font-medium
text-emerald-700
">

                                <Check size={12} />

                                پیشفرض

                            </div>

                        )}

                    </div>

                </div>

                <div className="
flex
gap-3
">

                    <button className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
border border-slate-200
">

                        <Edit3 size={15} />

                    </button>

                    <button className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
border border-red-200
text-red-600
">

                        <Trash2 size={15} />

                    </button>

                </div>

            </div>

            <p className="
mt-8
text-sm
leading-8
text-slate-600
">
                {address}
            </p>

        </div>

    );

}