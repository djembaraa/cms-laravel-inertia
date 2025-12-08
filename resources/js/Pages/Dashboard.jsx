import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    popularPosts,
    recentPosts,
    popularProjects,
    recentProjects,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Popular Posts */}
                <Card title="Popular Posts">
                    {popularPosts.length === 0 && (
                        <Empty text="Belum ada post." />
                    )}
                    <ul className="space-y-2">
                        {popularPosts.map((post) => (
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
                </Card>

                {/* Recent Posts */}
                <Card title="Recent Posts">
                    {recentPosts.length === 0 && (
                        <Empty text="Belum ada post." />
                    )}
                    <ul className="space-y-2">
                        {recentPosts.map((post) => (
                            <li key={post.id}>
                                <Link
                                    href={route("posts.show", post.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Popular Projects */}
                <Card title="Popular Projects">
                    {popularProjects.length === 0 && (
                        <Empty text="Belum ada project." />
                    )}
                    <ul className="space-y-2">
                        {popularProjects.map((project) => (
                            <li
                                key={project.id}
                                className="flex justify-between items-center"
                            >
                                <Link
                                    href={route("projects.show", project.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {project.title}
                                </Link>
                                <span className="text-xs text-gray-500">
                                    {project.views} views
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Recent Projects */}
                <Card title="Recent Projects">
                    {recentProjects.length === 0 && (
                        <Empty text="Belum ada project." />
                    )}
                    <ul className="space-y-2">
                        {recentProjects.map((project) => (
                            <li key={project.id}>
                                <Link
                                    href={route("projects.show", project.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {project.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                {title}
            </h3>
            {children}
        </div>
    );
}

function Empty({ text }) {
    return <div className="text-xs text-gray-400">{text}</div>;
}
