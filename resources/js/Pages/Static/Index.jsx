import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    totalPosts,
    totalProjects,
    totalVisitors,
    totalDiskUsage,
    topPosts,
    topProjects,
}) {
    const totalDiskMB = totalDiskUsage
        ? (totalDiskUsage / 1024 / 1024).toFixed(2)
        : 0;

    const maxDiskMB = 500;

    const usagePercent = Math.min(
        100,
        maxDiskMB > 0 ? (totalDiskMB / maxDiskMB) * 100 : 0
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Statistics
                </h2>
            }
        >
            <Head title="Statistics" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Posts" value={totalPosts} />
                <StatCard label="Total Projects" value={totalProjects} />
                <StatCard label="Total Visitors" value={totalVisitors} />
                <StatCard label="Disk Usage" value={`${totalDiskMB} MB`} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Disk Usage
                    </span>
                    <span className="text-xs text-gray-500">
                        {usagePercent.toFixed(1)}% of {maxDiskMB} MB
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                        className={
                            "h-full rounded-full " +
                            (usagePercent > 80
                                ? "bg-red-500"
                                : usagePercent > 60
                                ? "bg-yellow-400"
                                : "bg-green-500")
                        }
                        style={{ width: `${usagePercent}%` }}
                    />
                </div>
                {usagePercent > 80 && (
                    <p className="mt-2 text-xs text-red-600">
                        Warning: disk usage mendekati penuh!
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Top Posts by Visitors
                    </h3>
                    {topPosts.length === 0 && (
                        <p className="text-xs text-gray-400">Belum ada data.</p>
                    )}
                    <ul className="space-y-2">
                        {topPosts.map((post) => (
                            <li
                                key={post.id}
                                className="flex justify-between items-center"
                            >
                                <Link
                                    href={route("posts.show", post.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {post.title}
                                </Link>
                                <span className="text-xs text-gray-500">
                                    {post.views} views
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Top Projects by Visitors
                    </h3>
                    {topProjects.length === 0 && (
                        <p className="text-xs text-gray-400">Belum ada data.</p>
                    )}
                    <ul className="space-y-2">
                        {topProjects.map((project) => (
                            <li
                                key={project.id}
                                className="flex justify-between items-center"
                            >
                                <div>
                                    <Link
                                        href={route(
                                            "projects.show",
                                            project.id
                                        )}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {project.title}
                                    </Link>
                                    <div className="text-[10px] text-gray-400">
                                        Disk:{" "}
                                        {Math.round(
                                            (project.disk_usage || 0) / 1024
                                        )}{" "}
                                        KB
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {project.views} views
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500 uppercase tracking-wide">
                {label}
            </div>
            <div className="mt-2 text-2xl font-semibold text-gray-800">
                {value}
            </div>
        </div>
    );
}
