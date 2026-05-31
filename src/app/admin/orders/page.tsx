// src/app/admin/orders/page.tsx

"use client";

import {
Search,
Filter,
ChevronDown,
Eye,
Download,
} from "lucide-react";

const orders = [
{
id:"#AX2041",
customer:"پارس صنعت",
total:"۸,۲۰۰,۰۰۰",
items:5,
status:"paid",
date:"2026/05/31",
},

{
id:"#AX2042",
customer:"آریا ماشین",
total:"۲,۱۰۰,۰۰۰",
items:2,
status:"pending",
date:"2026/05/30",
},

{
id:"#AX2043",
customer:"توان صنعت",
total:"۱۲,۴۰۰,۰۰۰",
items:8,
status:"shipped",
date:"2026/05/28",
},
];

export default function OrdersPage(){

return(

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
مدیریت سفارشات
</h1>

<p className="
mt-3
text-sm
text-slate-500
">
پیگیری، مدیریت و پردازش سفارشات.
</p>

</div>

<button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
px-6 py-4
text-sm
font-medium
">

<Download size={16}/>

خروجی اکسل

</button>

</div>

<div className="
rounded-[34px]
border border-slate-200
bg-white
p-6
">

<div className="
flex
flex-col
gap-5
xl:flex-row
xl:items-center
xl:justify-between
">

<div className="
flex
items-center
gap-4
rounded-2xl
border border-slate-200
bg-slate-50
px-5 py-4
">

<Search size={18}/>

<input
placeholder="جستجوی سفارش..."
className="
w-[320px]
bg-transparent
outline-none
text-sm
"
/>

</div>

<div className="
flex
gap-4
flex-wrap
">

<Select>
وضعیت
</Select>

<Select>
تاریخ
</Select>

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

<Filter size={16}/>

فیلتر

</button>

</div>

</div>

</div>

<div className="
overflow-hidden
rounded-[34px]
border border-slate-200
bg-white
">

<table className="w-full">

<thead className="
bg-slate-50
text-right
">

<tr>

<TH>سفارش</TH>
<TH>مشتری</TH>
<TH>آیتم</TH>
<TH>مبلغ</TH>
<TH>تاریخ</TH>
<TH>وضعیت</TH>
<TH>عملیات</TH>

</tr>

</thead>

<tbody>

{orders.map((item)=>(

<tr
key={item.id}
className="
border-t
border-slate-100
hover:bg-slate-50
"
>

<TD>{item.id}</TD>

<TD>{item.customer}</TD>

<TD>{item.items}</TD>

<TD>{item.total}</TD>

<TD>{item.date}</TD>

<TD>

<OrderStatus
status={item.status}
/>

</TD>

<TD>

<button className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
border border-slate-200
">

<Eye size={16}/>

</button>

</TD>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}

function Select({
children,
}:any){

return(

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

{children}

<ChevronDown size={16}/>

</button>

);

}

function TH({children}:any){

return(
<th className="
px-8 py-5
text-sm
font-bold
text-slate-700
">
{children}
</th>
);

}

function TD({children}:any){

return(
<td className="
px-8 py-6
text-sm
text-slate-700
">
{children}
</td>
);

}

function OrderStatus({
status,
}:any){

const styles = {

paid:
"bg-emerald-50 text-emerald-700",

pending:
"bg-amber-50 text-amber-700",

shipped:
"bg-blue-50 text-blue-700",

};

const labels = {

paid:"پرداخت شده",

pending:"در انتظار",

shipped:"ارسال شد",

};

return(

<div className={`
inline-flex
rounded-full
px-4 py-2
text-xs
font-medium
${styles[status as keyof typeof styles]}
`}>

{labels[status as keyof typeof labels]}

</div>

);

}