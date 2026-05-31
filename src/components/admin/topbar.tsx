// src/components/admin/topbar.tsx

"use client";

import {
Bell,
Search,
Menu,
} from "lucide-react";

export default function AdminTopbar(){

return(

<header className="
sticky
top-0
z-50
border-b
border-slate-200
bg-white/90
backdrop-blur-xl
">

<div className="
flex
h-[88px]
items-center
justify-between
gap-6
px-8
">

{/* LEFT */}

<div className="
flex
items-center
gap-4
">

<button className="
flex
h-11
w-11
items-center
justify-center
rounded-2xl
border border-slate-200
xl:hidden
">

<Menu size={18}/>

</button>

<div className="
hidden
items-center
gap-4
rounded-2xl
border border-slate-200
bg-slate-50
px-5 py-4
lg:flex
">

<Search
size={18}
className="text-slate-400"
/>

<input
placeholder="جستجو..."
className="
w-[340px]
bg-transparent
text-sm
outline-none
"
/>

</div>

</div>

{/* RIGHT */}

<div className="
flex
items-center
gap-4
">

<button className="
relative
flex
h-11
w-11
items-center
justify-center
rounded-2xl
border border-slate-200
">

<Bell size={18}/>

<div className="
absolute
right-2
top-2
h-2
w-2
rounded-full
bg-red-500
"/>

</button>

<div className="
flex
items-center
gap-4
rounded-2xl
border border-slate-200
px-3 py-2
">

<div className="
flex
h-11
w-11
items-center
justify-center
rounded-xl
bg-blue-600
font-bold
text-white
">
SZ
</div>

<div className="hidden lg:block">

<h4 className="
text-sm
font-bold
text-slate-900
">
Admin User
</h4>

<p className="
mt-1
text-xs
text-slate-500
">
Administrator
</p>

</div>

</div>

</div>

</div>

</header>

);

}