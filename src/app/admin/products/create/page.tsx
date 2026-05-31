// src/app/admin/products/create/page.tsx

"use client";

import {
    Save,
    Upload,
    X,
    Plus,
    ChevronDown,
} from "lucide-react";

export default function CreateProductPage() {

    return (

        <div className="space-y-8">

            {/* HEADER */}

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
                        ایجاد محصول
                    </h1>

                    <p className="
mt-3
text-sm
leading-7
text-slate-500
">
                        افزودن محصول جدید به کاتالوگ AxisMart
                    </p>

                </div>

                <div className="
flex
gap-4
">

                    <button className="
rounded-2xl
border border-slate-200
px-6 py-4
text-sm
font-medium
">
                        پیش‌نویس
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

                        <Save size={16} />

                        ذخیره محصول

                    </button>

                </div>

            </div>

            <div className="
grid
gap-8
xl:grid-cols-[1fr_420px]
">

                {/* LEFT */}

                <div className="space-y-8">

                    {/* BASIC */}

                    <Card title="اطلاعات پایه">

                        <div className="grid gap-6">

                            <Field label="نام محصول">

                                <input
                                    placeholder="بلبرینگ SKF 6205"
                                    className={input}
                                />

                            </Field>

                            <Field label="Slug">

                                <input
                                    placeholder="skf-6205-bearing"
                                    className={input}
                                />

                            </Field>

                            <Field label="توضیحات">

                                <textarea
                                    rows={8}
                                    className={textarea}
                                />

                            </Field>

                        </div>

                    </Card>

                    {/* MEDIA */}

                    <Card title="تصاویر محصول">

                        <div className="
rounded-[30px]
border-2
border-dashed
border-slate-300
bg-slate-50
p-10
text-center
">

                            <div className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-blue-50
text-blue-600
">

                                <Upload size={28} />

                            </div>

                            <h3 className="
mt-8
text-lg
font-bold
text-slate-900
">
                                آپلود تصاویر
                            </h3>

                            <p className="
mt-3
text-sm
text-slate-500
">
                                Drag & Drop یا انتخاب فایل
                            </p>

                            <button className="
mt-8
rounded-2xl
bg-slate-900
px-6 py-4
text-sm
font-medium
text-white
">
                                انتخاب فایل
                            </button>

                        </div>

                    </Card>

                    {/* SPECS */}

                    <Card title="مشخصات فنی">

                        <div className="space-y-5">

                            <SpecRow />

                            <SpecRow />

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

                                <Plus size={16} />

                                افزودن مشخصه

                            </button>

                        </div>

                    </Card>

                </div>

                {/* RIGHT */}

                <div className="space-y-8">

                    {/* PRICING */}

                    <Card title="قیمت‌گذاری">

                        <div className="space-y-5">

                            <Field label="قیمت خرده">

                                <input
                                    className={input}
                                />

                            </Field>

                            <Field label="قیمت عمده">

                                <input
                                    className={input}
                                />

                            </Field>

                            <Field label="MOQ">

                                <input
                                    placeholder="10"
                                    className={input}
                                />

                            </Field>

                        </div>

                    </Card>

                    {/* INVENTORY */}

                    <Card title="موجودی">

                        <div className="space-y-5">

                            <Field label="SKU">

                                <input
                                    placeholder="AX-6205"
                                    className={input}
                                />

                            </Field>

                            <Field label="موجودی">

                                <input
                                    placeholder="42"
                                    className={input}
                                />

                            </Field>

                            <Field label="وضعیت">

                                <Select />

                            </Field>

                        </div>

                    </Card>

                    {/* CATEGORY */}

                    <Card title="دسته‌بندی">

                        <div className="space-y-5">

                            <Field label="دسته‌بندی">

                                <Select />

                            </Field>

                            <Field label="برند">

                                <Select />

                            </Field>

                            <Field label="برچسب‌ها">

                                <div className="
flex
flex-wrap
gap-3
rounded-2xl
border border-slate-200
p-4
">

                                    <Tag>
                                        SKF
                                    </Tag>

                                    <Tag>
                                        بلبرینگ
                                    </Tag>

                                    <button className="
inline-flex
items-center
gap-2
rounded-xl
border border-dashed border-slate-300
px-4 py-2
text-sm
text-slate-500
">

                                        <Plus size={14} />

                                        برچسب

                                    </button>

                                </div>

                            </Field>

                        </div>

                    </Card>

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
focus:border-blue-500
focus:bg-white
`;

const textarea = `
w-full
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
text-sm
outline-none
resize-none
`;

function Card({
    title,
    children,
}: any) {

    return (

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
                    {title}
                </h3>

            </div>

            <div className="p-8">

                {children}

            </div>

        </div>

    );

}

function Field({
    label,
    children,
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

            {children}

        </div>

    );

}

function Select() {

    return (

        <button className="
flex
w-full
items-center
justify-between
rounded-2xl
border border-slate-200
bg-slate-50
px-5 py-4
text-sm
text-slate-700
">

            انتخاب

            <ChevronDown size={16} />

        </button>

    );

}

function SpecRow() {

    return (

        <div className="
grid
gap-4
md:grid-cols-[1fr_1fr_auto]
">

            <input
                placeholder="نام"
                className={input}
            />

            <input
                placeholder="مقدار"
                className={input}
            />

            <button className="
flex
h-[56px]
w-[56px]
items-center
justify-center
rounded-2xl
border border-red-200
text-red-600
">

                <X size={18} />

            </button>

        </div>

    );

}

function Tag({
    children,
}: any) {

    return (

        <div className="
inline-flex
rounded-full
bg-blue-50
px-4 py-2
text-xs
font-medium
text-blue-700
">

            {children}

        </div>

    );

}