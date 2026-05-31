// src/app/customer/notifications/page.tsx

"use client";

import {
Bell,
Search,
CheckCheck,
Trash2,
Package,
BadgeDollarSign,
ShieldCheck,
Info,
Clock3,
Filter,
Settings2,
} from "lucide-react";

const notifications = [
{
id:1,
title:"سفارش شما ارسال شد",
desc:"سفارش #AX2041 وارد مرحله ارسال شد.",
time:"10 دقیقه پیش",
type:"order",
unread:true,
},

{
id:2,
title:"فاکتور جدید صادر شد",
desc:"فاکتور سفارش AX2019 آماده دانلود است.",
time:"1 ساعت پیش",
type:"invoice",
},

{
id:3,
title:"ورود جدید به حساب",
desc:"ورود موفق از دستگاه Windows Chrome.",
time:"دیروز",
type:"security",
},

{
id:4,
title:"بروزرسانی سیستم",
desc:"قوانین جدید خرید عمده منتشر شد.",
time:"3 روز پیش",
type:"info",
},
];

export default function NotificationsPage(){

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
اعلان‌ها
</h1>

<p className="
mt-3
text-sm
text-slate-500
">
مرکز اعلان‌ها، رویدادها و بروزرسانی‌های حساب.
</p>

</div>

<div className="flex gap-4 flex-wrap">

<button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-slate-200
bg-white
px-5 py-4
text-sm
font-medium
">

<CheckCheck size={16}/>

خواندن همه

</button>

<button className="
inline-flex
items-center
gap-3
rounded-2xl
border border-red-200
bg-red-50
px-5 py-4
text-sm
font-medium
text-red-600
">

<Trash2 size={16}/>

پاکسازی

</button>

</div>

</div>

<div className="
grid
gap-6
xl:grid-cols-4
">

<Mini title="کل اعلان‌ها" value="48"/>
<Mini title="خوانده نشده" value="7"/>
<Mini title="سفارشات" value="22"/>
<Mini title="مالی" value="11"/>

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
placeholder="جستجوی اعلان..."
className="
w-[320px]
bg-transparent
outline-none
text-sm
"
/>

</div>

<div className="flex gap-4 flex-wrap">

<Action icon={<Filter size={15}/>}>
فیلتر
</Action>

<Action icon={<Settings2 size={15}/>}>
تنظیمات
</Action>

</div>

</div>

</div>

<div className="space-y-5">

{notifications.map((item)=>(

<NotificationCard
key={item.id}
{...item}
/>

))}

</div>

</div>

);

}

function NotificationCard({
title,
desc,
time,
type,
unread,
}:any){

const icons:any = {

order:<Package size={18}/>,

invoice:<BadgeDollarSign size={18}/>,

security:<ShieldCheck size={18}/>,

info:<Info size={18}/>,

};

return(

<div className={`
rounded-[34px]
border
bg-white
p-7
transition
${
unread
?
"border-blue-300"
:
"border-slate-200"
}
`}>

<div className="
flex
items-start
justify-between
gap-6
">

<div className="
flex
items-start
gap-5
">

<div className="
flex
h-16
w-16
items-center
justify-center
rounded-3xl
bg-blue-50
text-blue-700
">

{icons[type]}

</div>

<div>

<div className="
flex
items-center
gap-4
flex-wrap
">

<h3 className="
font-black
text-slate-900
">
{title}
</h3>

{unread && (

<div className="
rounded-full
bg-blue-100
px-4 py-2
text-[11px]
font-bold
text-blue-700
">
جدید
</div>

)}

</div>

<p className="
mt-4
text-sm
leading-8
text-slate-500
">
{desc}
</p>

<div className="
mt-5
inline-flex
items-center
gap-2
text-xs
text-slate-400
">

<Clock3 size={13}/>

{time}

</div>

</div>

</div>

<div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-slate-50
text-slate-500
">

<Bell size={16}/>

</div>

</div>

</div>

);

}

function Mini({title,value}:any){

return(

<div className="
rounded-[34px]
border border-slate-200
bg-white
p-7
">

<p className="
text-sm
text-slate-500
">
{title}
</p>

<h3 className="
mt-4
text-3xl
font-black
text-slate-900
">
{value}
</h3>

</div>

);

}

function Action({
children,
icon,
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

{icon}

{children}

</button>

);

}