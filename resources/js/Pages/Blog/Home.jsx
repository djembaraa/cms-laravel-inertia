import { Head, Link } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function Home({ owner, popularPosts, projects, recentPosts }) {
    const siteTitle = owner?.name || "My Blog";
    const siteDescription =
        owner?.subtitle ||
        "Blog pribadi dan portfolio berisi tulisan dan project yang dikelola dengan CMS Laravel + Inertia.";

    const articles = recentPosts?.data || [];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content={siteDescription} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={route("blog.home")} />
            </Head>

            {/* NAVBAR */}
            <header className="border-b bg-white sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {owner?.project_logo ? (
                            <img
                                src={`/storage/${owner.project_logo}`}
                                alt={`${siteTitle} logo`}
                                className="h-9 w-9 rounded-md object-cover border"
                            />
                        ) : (
                            <div className="h-9 w-9 rounded-md bg-gray-900 flex items-center justify-center text-xs font-bold text-white">
                                CMS
                            </div>
                        )}
                        <div>
                            <Link
                                href={route("blog.home")}
                                className="font-semibold text-base md:text-lg hover:text-gray-700"
                            >
                                {siteTitle}
                            </Link>
                            <p className="text-[11px] md:text-xs text-gray-500">
                                {siteDescription}
                            </p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center space-x-5 text-sm">
                        <a
                            href="#popular"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Popular
                        </a>
                        <a
                            href="#projects"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Projects
                        </a>
                        <a
                            href="#articles"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Articles
                        </a>
                        <Link
                            href={route("login")}
                            className="text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50"
                        >
                            Admin Login
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 pb-12">
                <section
                    aria-labelledby="hero-heading"
                    className="py-10 md:py-14 flex flex-col md:flex-row md:items-center gap-8 border-b"
                >
                    <div className="flex-1">
                        <h1
                            id="hero-heading"
                            className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
                        >
                            Selamat datang di{" "}
                            <span className="text-gray-900 underline decoration-gray-300">
                                {siteTitle}
                            </span>
                        </h1>
                        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl">
                            Kumpulan tulisan, catatan teknis, dan proyek yang
                            saya kerjakan. Semua konten dikelola lewat CMS
                            custom berbasis Laravel, Inertia, React, dan
                            Tailwind CSS.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 border border-gray-200">
                                🚀 Laravel + Inertia CMS
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 border border-gray-200">
                                💼 Projects & Blog
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex justify-center">
                        {owner?.avatar ? (
                            <img
                                src={`/storage/${owner.avatar}`}
                                alt={owner.name}
                                className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover border shadow-sm"
                            />
                        ) : (
                            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                No Avatar
                            </div>
                        )}
                    </div>
                </section>

                <section
                    id="popular"
                    aria-labelledby="popular-heading"
                    className="pt-10 md:pt-12"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            id="popular-heading"
                            className="text-xl md:text-2xl font-semibold text-gray-900"
                        >
                            Popular Posts
                        </h2>
                        <p className="text-xs text-gray-500">
                            Berdasarkan jumlah views tertinggi
                        </p>
                    </div>

                    {popularPosts.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada post populer. Mulai tulis dari dashboard,
                            nanti otomatis muncul di sini.
                        </p>
                    ) : (
                        <Swiper
                            modules={[Pagination, Navigation, Autoplay]}
                            spaceBetween={16}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1.3 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            pagination={{ clickable: true }}
                            navigation
                            autoplay={{
                                delay: 4500,
                                disableOnInteraction: false,
                            }}
                            className="pb-8"
                        >
                            {popularPosts.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <article className="bg-white rounded-lg border px-4 py-4 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-base font-semibold text-gray-900">
                                                    <Link
                                                        href={route(
                                                            "blog.posts.show",
                                                            post.id
                                                        )}
                                                        className="hover:underline"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>
                                                <span className="text-[11px] text-gray-400">
                                                    {formatDate(
                                                        post.created_at
                                                    )}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                                            <span>{post.views} views</span>
                                            <span>Featured</span>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </section>

                <section
                    id="projects"
                    aria-labelledby="projects-heading"
                    className="pt-8 md:pt-10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            id="projects-heading"
                            className="text-xl md:text-2xl font-semibold text-gray-900"
                        >
                            Projects
                        </h2>
                        <p className="text-xs text-gray-500">
                            Beberapa proyek yang sedang / pernah saya kerjakan
                        </p>
                    </div>

                    {projects.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada project. Tambahkan project dari dashboard
                            CMS.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="bg-white rounded-lg border px-4 py-4 flex flex-col hover:shadow-md transition-shadow"
                                >
                                    {project.media_path && (
                                        <img
                                            src={`/storage/${project.media_path}`}
                                            alt={project.title}
                                            className="rounded-md mb-3 h-36 w-full object-cover"
                                        />
                                    )}
                                    <h3 className="text-base font-semibold text-gray-900">
                                        <Link
                                            href={route(
                                                "blog.projects.show",
                                                project.id
                                            )}
                                            className="hover:underline"
                                        >
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                                        <span>{project.views} views</span>
                                        <span>
                                            {formatDate(project.created_at)}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section
                    id="articles"
                    aria-labelledby="articles-heading"
                    className="pt-10 md:pt-12 border-t mt-10"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            id="articles-heading"
                            className="text-xl md:text-2xl font-semibold text-gray-900"
                        >
                            Latest Articles
                        </h2>
                        <span className="text-xs text-gray-500">
                            Total: {articles.length} posts di halaman ini
                        </span>
                    </div>

                    {articles.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada artikel. Tulis artikel pertamamu dari
                            halaman Posts di dashboard.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {articles.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg border px-4 py-3 hover:shadow-sm transition-shadow"
                                    itemScope
                                    itemType="https://schema.org/Article"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                        <div>
                                            <h3
                                                className="text-base md:text-lg font-semibold text-gray-900"
                                                itemProp="headline"
                                            >
                                                <Link
                                                    href={route(
                                                        "blog.posts.show",
                                                        post.id
                                                    )}
                                                    className="hover:underline"
                                                >
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p
                                                className="mt-1 text-sm text-gray-600 line-clamp-2"
                                                itemProp="description"
                                            >
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="text-[11px] text-gray-400 flex flex-col items-start md:items-end">
                                            <span>
                                                {formatDate(post.created_at)}
                                            </span>
                                            <span>{post.views} views</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {recentPosts?.links && recentPosts.links.length > 3 && (
                        <nav
                            className="mt-5 flex flex-wrap gap-2 text-xs"
                            aria-label="Pagination"
                        >
                            {recentPosts.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || "#"}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={
                                        "px-3 py-1 rounded border " +
                                        (link.active
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-600 hover:bg-gray-50")
                                    }
                                />
                            ))}
                        </nav>
                    )}
                </section>
            </main>

            <footer className="border-t bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-gray-400 flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
                    <span>
                        © {new Date().getFullYear()} {siteTitle}. All rights
                        reserved.
                    </span>
                    <span>
                        Powered by Laravel + Inertia + React + Tailwind CSS
                    </span>
                </div>
            </footer>
        </div>
    );
}
