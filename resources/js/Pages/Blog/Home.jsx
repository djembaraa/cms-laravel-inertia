import { Head, Link } from "@inertiajs/react";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function Home({ owner, posts, projects }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={owner?.name || "Blog"} />

            <header className="border-b bg-white">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {owner?.project_logo && (
                            <img
                                src={`/storage/${owner.project_logo}`}
                                alt="Logo"
                                className="h-9 w-9 rounded-md object-cover border"
                            />
                        )}
                        <div>
                            <div className="font-semibold text-lg text-gray-900">
                                {owner?.name || "My Blog"}
                            </div>
                            <div className="text-xs text-gray-500">
                                {owner?.subtitle || "Personal blog & projects"}
                            </div>
                        </div>
                    </div>

                    <nav className="text-sm space-x-4">
                        <Link
                            href={route("blog.home")}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            Home
                        </Link>
                    </nav>
                </div>
            </header>

            <section className="bg-white border-b">
                <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {owner?.name || "Welcome to my blog"}
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 max-w-xl">
                            Tulisan pribadi, catatan teknis, dan kumpulan
                            project yang dikelola lewat CMS Laravel + Inertia
                            buatan sendiri.
                        </p>
                    </div>
                    {owner?.avatar && (
                        <img
                            src={`/storage/${owner.avatar}`}
                            alt="Avatar"
                            className="h-20 w-20 rounded-full object-cover border shadow-sm"
                        />
                    )}
                </div>
            </section>

            {/* CONTENT */}
            <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
                {/* POSTS */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Latest Posts
                        </h2>
                        <span className="text-xs text-gray-500">
                            Total: {posts.length} posts
                        </span>
                    </div>

                    {posts.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada post. Login ke dashboard untuk membuat
                            post pertama.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg border px-4 py-3 hover:shadow-sm transition"
                                >
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
                                            {formatDate(post.created_at)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-2 text-[11px] text-gray-400 flex items-center space-x-3">
                                        <span>{post.views} views</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Projects
                        </h2>
                        <span className="text-xs text-gray-500">
                            Total: {projects.length} projects
                        </span>
                    </div>

                    {projects.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada project. Tambahkan project dari dashboard.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="bg-white rounded-lg border px-4 py-3 hover:shadow-sm transition flex flex-col justify-between"
                                >
                                    <div>
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
                                        <p className="mt-1 text-sm text-gray-600">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="mt-2 text-[11px] text-gray-400 flex items-center justify-between">
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
            </main>

            <footer className="border-t bg-white">
                <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-gray-400 flex justify-between">
                    <span>
                        © {new Date().getFullYear()} {owner?.name || "My Blog"}
                    </span>
                    <span>Powered by Laravel + Inertia CMS</span>
                </div>
            </footer>
        </div>
    );
}
