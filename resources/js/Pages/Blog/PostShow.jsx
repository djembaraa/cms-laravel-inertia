import { Head, Link } from "@inertiajs/react";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function PostShow({ owner, post }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={post.title} />

            <header className="border-b bg-white">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href={route("blog.home")}
                        className="text-sm font-semibold text-gray-800 hover:underline"
                    >
                        {owner?.name || "My Blog"}
                    </Link>
                    <span className="text-xs text-gray-400">
                        {post.views} views
                    </span>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-10">
                <article className="bg-white rounded-lg border px-6 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {post.title}
                    </h1>
                    <div className="mt-1 text-xs text-gray-400">
                        {formatDate(post.created_at)}
                    </div>

                    {post.media_path && (
                        <div className="mt-4">
                            <img
                                src={`/storage/${post.media_path}`}
                                alt={post.title}
                                className="rounded-md max-h-80 w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="mt-4 text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                        {post.body}
                    </div>
                </article>

                <div className="mt-6">
                    <Link
                        href={route("blog.home")}
                        className="text-xs text-gray-500 hover:underline"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
