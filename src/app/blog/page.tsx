"use client";

import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";

const posts = [
    {
        title: "راهنمای انتخاب بلبرینگ صنعتی",
        category: "بلبرینگ",
    },
    {
        title: "تفاوت تسمه صنعتی و انتقال قدرت",
        category: "تسمه",
    },
    {
        title: "نکات خرید زنجیر صنعتی",
        category: "زنجیر",
    },
];

export default function BlogPage() {
    return (
        <>
            <Navbar />

            <main className="pt-36 py-28">

                <div className="mx-auto max-w-[1450px] px-8">

                    <h1 className="
          text-7xl
          font-black
          text-slate-900
          ">
                        مقالات صنعتی
                    </h1>

                    <p className="
          mt-8
          text-xl
          text-slate-600
          ">
                        آموزش‌ها، راهنماها و دانش تخصصی صنعت.
                    </p>

                    <div className="
          mt-20
          grid gap-8
          lg:grid-cols-3
          ">

                        {posts.map((post) => (
                            <article
                                key={post.title}
                                className="
                overflow-hidden
                border border-slate-200
                bg-white
                shadow-[0_20px_50px_rgba(15,23,42,.05)]
                "
                            >

                                <div className="
                h-[240px]
                bg-gradient-to-br
                from-blue-100
                to-cyan-100
                " />

                                <div className="p-8">

                                    <span className="
                  text-sm
                  text-blue-600
                  ">
                                        {post.category}
                                    </span>

                                    <h2 className="
                  mt-5
                  text-2xl
                  font-black
                  text-slate-900
                  ">
                                        {post.title}
                                    </h2>

                                    <button className="
                  mt-10
                  text-blue-600
                  font-bold
                  ">
                                        مطالعه مقاله ←
                                    </button>
                                </div>
                            </article>
                        ))}

                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}