import { Head, Link } from "@inertiajs/react";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ProjectShow({ owner, project }) {
    const title = `${project.title} | ${owner?.name || "My Blog"}`;
    const description =
        project.description?.slice(0, 150).replace(/\s+\S*$/, "") ||
        "Project from " + (owner?.name || "My Blog");

    const techs = Array.isArray(project.techstack)
        ? project.techstack
        : typeof project.techstack === "string"
        ? project.techstack.split(",").map((t) => t.trim())
        : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
            </Head>

            {/* HEADER */}
            <header className="border-b bg-white">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href={route("blog.home")}
                        className="text-sm font-semibold text-gray-800 hover:underline"
                    >
                        {owner?.name || "My Blog"}
                    </Link>
                    <span className="text-xs text-gray-400">
                        {project.views} views
                    </span>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-3xl mx-auto px-4 py-10">
                <article
                    className="bg-white rounded-lg border px-6 py-6"
                    itemScope
                    itemType="https://schema.org/CreativeWork"
                >
                    <h1
                        className="text-2xl font-bold text-gray-900"
                        itemProp="name"
                    >
                        {project.title}
                    </h1>

                    <div className="mt-1 text-xs text-gray-400 flex items-center gap-3">
                        <span>{formatDate(project.created_at)}</span>
                        {techs.length > 0 && (
                            <span>{techs.length} tech(s) used</span>
                        )}
                    </div>

                    {project.media_path && (
                        <div className="mt-4">
                            <img
                                src={`/storage/${project.media_path}`}
                                alt={project.title}
                                className="rounded-md max-h-80 w-full object-cover"
                                itemProp="image"
                            />
                        </div>
                    )}

                    <div
                        className="mt-4 text-sm text-gray-800 leading-relaxed whitespace-pre-line"
                        itemProp="description"
                    >
                        {project.description}
                    </div>

                    {techs.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                Tech stack
                            </h2>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {techs.map((t) => (
                                    <span
                                        key={t}
                                        className="inline-flex px-2 py-1 text-[11px] rounded-full bg-gray-100 text-gray-700 border"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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
