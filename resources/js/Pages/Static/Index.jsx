import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function StaticIndex({ totals, topPosts, topProjects }) {
    const { auth } = usePage().props;

    const [activePanel, setActivePanel] = useState("overview"); // overview | posts | projects | storage

    const cards = [
        {
            key: "posts",
            label: "Total Posts",
            value: totals.posts,
            subtitle: `${totals.post_views} total post views`,
        },
        {
            key: "projects",
            label: "Total Projects",
            value: totals.projects,
            subtitle: `${totals.project_views} total project views`,
        },
        {
            key: "visits",
            label: "Total Visitor (views)",
            value: totals.total_visits,
            subtitle: "Jumlah view dari posts + projects",
        },
        {
            key: "storage",
            label: "Disk Usage",
            value: `${totals.disk_usage_mb} / ${totals.disk_limit_mb} MB`,
            subtitle: `${totals.disk_percent}% terpakai`,
            warning: totals.disk_warning,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Static / Analytics
                </h2>
            }
        >
            <Head title="Static Analytics" />

            <div className="mb-4 text-xs text-gray-500">
                <span>Home / </span>
                <span className="font-semibold text-gray-700">Static</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {cards.map((card) => (
                    <button
                        key={card.key}
                        type="button"
                        onClick={() =>
                            setActivePanel(
                                card.key === "visits" ? "overview" : card.key
                            )
                        }
                        className={
                            "text-left rounded-lg border px-4 py-3 bg-white hover:shadow-sm transition flex flex-col justify-between " +
                            (activePanel === card.key ||
                            (card.key === "visits" &&
                                activePanel === "overview")
                                ? "border-gray-900"
                                : "border-gray-200")
                        }
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-[11px] uppercase tracking-wide text-gray-500">
                                    {card.label}
                                </div>
                                <div className="mt-1 text-lg font-semibold text-gray-900">
                                    {card.value}
                                </div>
                            </div>
                            {card.key === "storage" && (
                                <div
                                    className={
                                        "text-[11px] px-2 py-1 rounded-full " +
                                        (card.warning
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700")
                                    }
                                >
                                    {card.warning ? "Warning" : "OK"}
                                </div>
                            )}
                        </div>
                        <div className="mt-2 text-[11px] text-gray-500">
                            {card.subtitle}
                        </div>
                    </button>
                ))}
            </div>

            {/* DETAIL PANEL */}
            <div className="bg-white border rounded-lg p-4 shadow-sm text-sm">
                {activePanel === "overview" && (
                    <OverviewPanel totals={totals} />
                )}

                {activePanel === "posts" && (
                    <PostsPanel totals={totals} topPosts={topPosts} />
                )}

                {activePanel === "projects" && (
                    <ProjectsPanel totals={totals} topProjects={topProjects} />
                )}

                {activePanel === "storage" && <StoragePanel totals={totals} />}
            </div>
        </AuthenticatedLayout>
    );
}

function OverviewPanel({ totals }) {
    return (
        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
                Overview
            </h3>
            <p className="text-xs text-gray-500 mb-4">
                Ringkasan cepat aktivitas konten dan penggunaan storage
                aplikasi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="rounded-md border px-3 py-2">
                    <div className="text-gray-500">Konten</div>
                    <div className="mt-1 text-sm text-gray-900">
                        {totals.posts} posts, {totals.projects} projects
                    </div>
                </div>
                <div className="rounded-md border px-3 py-2">
                    <div className="text-gray-500">Total Visitor (views)</div>
                    <div className="mt-1 text-sm text-gray-900">
                        {totals.total_visits} views
                    </div>
                </div>
                <div className="rounded-md border px-3 py-2">
                    <div className="text-gray-500">Disk Usage</div>
                    <div className="mt-1 text-sm text-gray-900">
                        {totals.disk_usage_mb} / {totals.disk_limit_mb} MB (
                        {totals.disk_percent}
                        %)
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostsPanel({ totals, topPosts }) {
    const maxViews =
        topPosts && topPosts.length
            ? Math.max(...topPosts.map((p) => p.views || 0))
            : 0;

    return (
        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
                Posts - Visitors & Popular Posts
            </h3>
            <p className="text-xs text-gray-500 mb-4">
                Grafik sederhana post dengan jumlah visitor (views) terbanyak.
            </p>

            <div className="mb-4 text-xs text-gray-600">
                Total posts:{" "}
                <span className="font-semibold text-gray-900">
                    {totals.posts}
                </span>{" "}
                • Total views:{" "}
                <span className="font-semibold text-gray-900">
                    {totals.post_views}
                </span>
            </div>

            {(!topPosts || topPosts.length === 0) && (
                <p className="text-xs text-gray-500">
                    Belum ada data views post.
                </p>
            )}

            {topPosts && topPosts.length > 0 && (
                <div className="space-y-2">
                    {topPosts.map((post) => {
                        const percent =
                            maxViews > 0
                                ? Math.round((post.views / maxViews) * 100)
                                : 0;

                        return (
                            <div key={post.id}>
                                <div className="flex justify-between text-[11px] text-gray-600 mb-1">
                                    <span className="line-clamp-1">
                                        {post.title}
                                    </span>
                                    <span>{post.views} views</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full bg-gray-900"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function ProjectsPanel({ totals, topProjects }) {
    const maxViews =
        topProjects && topProjects.length
            ? Math.max(...topProjects.map((p) => p.views || 0))
            : 0;

    return (
        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
                Projects - Visitors & Popular Projects
            </h3>
            <p className="text-xs text-gray-500 mb-4">
                Grafik sederhana project dengan jumlah visitor (views)
                terbanyak.
            </p>

            <div className="mb-4 text-xs text-gray-600">
                Total projects:{" "}
                <span className="font-semibold text-gray-900">
                    {totals.projects}
                </span>{" "}
                • Total views:{" "}
                <span className="font-semibold text-gray-900">
                    {totals.project_views}
                </span>
            </div>

            {(!topProjects || topProjects.length === 0) && (
                <p className="text-xs text-gray-500">
                    Belum ada data views project.
                </p>
            )}

            {topProjects && topProjects.length > 0 && (
                <div className="space-y-2">
                    {topProjects.map((project) => {
                        const percent =
                            maxViews > 0
                                ? Math.round((project.views / maxViews) * 100)
                                : 0;

                        return (
                            <div key={project.id}>
                                <div className="flex justify-between text-[11px] text-gray-600 mb-1">
                                    <span className="line-clamp-1">
                                        {project.title}
                                    </span>
                                    <span>{project.views} views</span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full bg-gray-900"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function StoragePanel({ totals }) {
    const percent = totals.disk_percent || 0;
    const isWarning = totals.disk_warning;

    return (
        <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">
                Storage / Disk Usage
            </h3>
            <p className="text-xs text-gray-500 mb-4">
                Monitoring penggunaan disk untuk upload media (avatar, logo,
                gambar post, gambar project).
            </p>

            <div className="mb-3 text-xs text-gray-700">
                {totals.disk_usage_mb} MB dari {totals.disk_limit_mb} MB
                terpakai ({percent}%)
            </div>

            <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-2">
                <div
                    className={
                        "h-full transition-all " +
                        (isWarning ? "bg-red-500" : "bg-gray-900")
                    }
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            <div className="text-[11px] text-gray-500">
                {isWarning ? (
                    <span>
                        ⚠️ Disk hampir penuh. Pertimbangkan untuk menghapus
                        media yang tidak terpakai atau menaikkan kapasitas
                        storage di server/VPS.
                    </span>
                ) : (
                    <span>
                        ✅ Penggunaan disk masih aman. Terus pantau jika banyak
                        upload gambar atau file besar.
                    </span>
                )}
            </div>
        </div>
    );
}
