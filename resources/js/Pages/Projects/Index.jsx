import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ projects }) {
    const { flash } = usePage().props;
    const [selected, setSelected] = useState([]);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selected.length === projects.length) {
            setSelected([]);
        } else {
            setSelected(projects.map((p) => p.id));
        }
    };

    const handleBulkDelete = () => {
        if (selected.length === 0) return;
        if (!confirm("Are you sure delete selected projects?")) return;

        router.delete(route("projects.bulk-destroy"), {
            data: { ids: selected },
        });
    };

    const handleDeleteOne = (id) => {
        if (!confirm("Are you sure delete this project?")) return;
        router.delete(route("projects.destroy", id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="space-x-2">
                        <Link
                            href={route("projects.create")}
                            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                            Create Project
                        </Link>
                        <button
                            onClick={handleBulkDelete}
                            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="text-xs text-gray-500">
                        Total: {projects.length} projects
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b bg-gray-50 text-left">
                                <th className="px-3 py-2">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selected.length ===
                                                projects.length &&
                                            projects.length > 0
                                        }
                                        onChange={selectAll}
                                    />
                                </th>
                                <th className="px-3 py-2">Title</th>
                                <th className="px-3 py-2">Author</th>
                                <th className="px-3 py-2">Views</th>
                                <th className="px-3 py-2">Disk (KB)</th>
                                <th className="px-3 py-2 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-3 py-4 text-center text-gray-400"
                                    >
                                        Belum ada project.
                                    </td>
                                </tr>
                            )}

                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="border-b last:border-none"
                                >
                                    <td className="px-3 py-2">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(
                                                project.id
                                            )}
                                            onChange={() =>
                                                toggleSelect(project.id)
                                            }
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={route(
                                                "projects.show",
                                                project.id
                                            )}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {project.title}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 text-gray-600">
                                        {project.user?.name ?? "-"}
                                    </td>
                                    <td className="px-3 py-2">
                                        {project.views ?? 0}
                                    </td>
                                    <td className="px-3 py-2 text-xs text-gray-500">
                                        {Math.round(
                                            (project.disk_usage || 0) / 1024
                                        )}
                                    </td>
                                    <td className="px-3 py-2 text-right space-x-2">
                                        <Link
                                            href={route(
                                                "projects.edit",
                                                project.id
                                            )}
                                            className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteOne(project.id)
                                            }
                                            className="inline-flex items-center rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
