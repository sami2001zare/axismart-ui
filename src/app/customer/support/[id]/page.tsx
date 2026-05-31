// src/app/customer/support/[id]/page.tsx

"use client";

import {
    ArrowRight,
    Send,
    Paperclip,
    Clock3,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
} from "lucide-react";

export default function SupportDetailsPage() {

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

                <div className="
flex
items-center
gap-5
">

                    <button className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border border-slate-200
bg-white
">

                        <ArrowRight size={18} />

                    </button>

                    <div>

                        <div className="
flex
items-center
gap-4
flex-wrap
">

                            <h1 className="
text-4xl
font-black
text-slate-900
">
                                SUP-2041
                            </h1>

                            <div className="
inline-flex
items-center
gap-2
rounded-full
bg-blue-50
px-4 py-2
text-xs
font-medium
text-blue-700
">

                                <AlertCircle size={13} />

                                باز

                            </div>

                        </div>

                        <p className="
mt-3
text-sm
text-slate-500
">
                            مشکل در ثبت سفارش عمده
                        </p>

                    </div>

                </div>

            </div>

            <div className="
grid
gap-8
xl:grid-cols-[1.5fr_380px]
">

                <div className="space-y-6">

                    <Message
                        mine
                        name="سامان زارع"
                        time="10:22"
                        text="در هنگام ثبت سفارش عمده، خطا دریافت می‌کنم و فرایند تکمیل نمی‌شود."
                    />

                    <Message
                        name="پشتیبانی AxisMart"
                        time="10:45"
                        text="در حال بررسی موضوع هستیم. لطفا تصویر خطا را ارسال کنید."
                    />

                    <Message
                        mine
                        name="سامان زارع"
                        time="11:02"
                        text="تصویر خطا ارسال شد. مشکل همچنان پابرجاست."
                    />

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

                        <textarea
                            rows={6}
                            placeholder="پاسخ خود را بنویسید..."
                            className="
w-full
resize-none
rounded-2xl
border border-slate-200
bg-slate-50
p-5
text-sm
outline-none
"
                        />

                        <div className="
mt-6
flex
items-center
justify-between
gap-5
">

                            <button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
px-5 py-4
text-sm
font-medium
">

                                <Paperclip size={16} />

                                ضمیمه فایل

                            </button>

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

                                <Send size={16} />

                                ارسال پاسخ

                            </button>

                        </div>

                    </div>

                </div>

                <div className="space-y-8">

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

                        <h3 className="
font-black
text-slate-900
">
                            جزئیات تیکت
                        </h3>

                        <div className="
mt-8
space-y-4
">

                            <Info
                                label="شناسه"
                                value="SUP-2041"
                            />

                            <Info
                                label="دپارتمان"
                                value="فروش"
                            />

                            <Info
                                label="اولویت"
                                value="High"
                            />

                            <Info
                                label="تاریخ"
                                value="2026/05/31"
                            />

                        </div>

                    </div>

                    <div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

                        <h3 className="
font-black
text-slate-900
">
                            وضعیت
                        </h3>

                        <div className="
mt-8
space-y-5
">

                            <StatusCard
                                icon={<Clock3 size={18} />}
                                title="در حال بررسی"
                            />

                            <StatusCard
                                icon={<CheckCircle2 size={18} />}
                                title="پاسخ داده شد"
                            />

                            <StatusCard
                                icon={<MessageSquare size={18} />}
                                title="منتظر پاسخ مشتری"
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

function Message({
    mine,
    name,
    time,
    text,
}: any) {

    return (

        <div className={`
flex
${mine ? "justify-end" : "justify-start"}
`}>

            <div className={`
max-w-[720px]
rounded-[34px]
p-7
${mine
                    ?
                    "bg-blue-600 text-white"
                    :
                    "border border-slate-200 bg-white"
                }
`}>

                <div className="
flex
items-center
justify-between
gap-5
">

                    <h4 className="
font-black
">
                        {name}
                    </h4>

                    <p className={`
text-xs
${mine ? "text-blue-100" : "text-slate-500"}
`}>

                        {time}

                    </p>

                </div>

                <p className={`
mt-5
text-sm
leading-8
${mine ? "text-blue-50" : "text-slate-600"}
`}>

                    {text}

                </p>

            </div>

        </div>

    );

}

function Info({
    label,
    value,
}: any) {

    return (

        <div className="
flex
items-center
justify-between
rounded-2xl
bg-slate-50
p-4
">

            <p className="
text-sm
text-slate-500
">
                {label}
            </p>

            <p className="
font-bold
text-slate-900
">
                {value}
            </p>

        </div>

    );

}

function StatusCard({
    icon,
    title,
}: any) {

    return (

        <div className="
flex
items-center
gap-4
rounded-2xl
bg-slate-50
p-5
">

            <div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-50
text-blue-700
">

                {icon}

            </div>

            <p className="
font-medium
text-slate-700
">
                {title}
            </p>

        </div>

    );

}