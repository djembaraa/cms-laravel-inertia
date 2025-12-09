import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ProjectsIndex({ projects }) {
    const { flash } = usePage().props;

    const [showCreate, setShowCreate] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset: resetForm,
    } = useForm({
        title: "",
        description: "",
        media: null,
        techstack: "",
    });

    const [selectedIds, setSelectedIds] = useState([]);

    const handleToggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (!projects || projects.length === 0) return;
        if (selectedIds.length === projects.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(projects.map((p) => p.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm("Are you sure delete selected projects?")) {
            return;
        }

        router.delete(route("projects.bulk-destroy"), {
            data: { ids: selectedIds },
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleSingleDelete = (id) => {
        if (!window.confirm("Are you sure delete this project?")) return;

        router.delete(route("projects.destroy", id));
    };

    const submitCreate = (e) => {
        e.preventDefault();

        post(route("projects.store"), {
            forceFormData: true,
            onSuccess: () => {
                resetForm();
                setShowCreate(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Projects
                    </h2>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowCreate((v) => !v)}
                            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
                        >
                            {showCreate ? "Close Form" : "Create Project"}
                        </button>

                        <button
                            type="button"
                            onClick={handleBulkDelete}
                            disabled={selectedIds.length === 0}
                            className="inline-flex items-center rounded-md border border-red-500 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
                        >
                            Delete Selected
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Projects" />

            {/* FLASH MESSAGE */}
            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            {showCreate && (
                <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                        Create New Project
                    </h3>

                    <form onSubmit={submitCreate} className="space-y-4 text-sm">
                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Media (minimal 1)
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("media", e.target.files[0])
                                }
                                className="mt-1 block w-full text-xs"
                            />
                            {errors.media && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.media}
                                </p>
                            )}
                            <p className="mt-1 text-[11px] text-gray-400">
                                Upload minimal 1 gambar/screenshot project.
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Tech Stack (pisahkan dengan koma)
                            </label>
                            <input
                                type="text"
                                value={data.techstack}
                                onChange={(e) =>
                                    setData("techstack", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                                placeholder="Laravel, React, MySQL, Tailwind"
                            />
                            {errors.techstack && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.techstack}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                Save Project
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-4 py-3 border-b flex items-center justify-between text-xs text-gray-600">
                    <span>List Projects</span>
                    <span>
                        Total:{" "}
                        {Array.isArray(projects)
                            ? projects.length
                            : projects?.data?.length || 0}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            projects &&
                                            Array.isArray(projects) &&
                                            projects.length > 0 &&
                                            selectedIds.length ===
                                                projects.length
                                        }
                                    />
                                </th>
                                <th className="px-3 py-2 text-left font-medium text-gray-700">
                                    Title
                                </th>
                                <th className="px-3 py-2 text-left font-medium text-gray-700">
                                    Views
                                </th>
                                <th className="px-3 py-2 text-left font-medium text-gray-700">
                                    Tech Stack
                                </th>
                                <th className="px-3 py-2 text-left font-medium text-gray-700">
                                    Created
                                </th>
                                <th className="px-3 py-2 text-right font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(!projects || projects.length === 0) && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-4 py-4 text-center text-xs text-gray-500"
                                    >
                                        Belum ada project.
                                    </td>
                                </tr>
                            )}

                            {Array.isArray(projects) &&
                                projects.map((project) => {
                                    const techs = Array.isArray(
                                        project.techstack
                                    )
                                        ? project.techstack
                                        : typeof project.techstack === "string"
                                        ? project.techstack
                                              .split(",")
                                              .map((t) => t.trim())
                                        : [];

                                    return (
                                        <tr
                                            key={project.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(
                                                        project.id
                                                    )}
                                                    onChange={() =>
                                                        handleToggleSelect(
                                                            project.id
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="font-semibold text-gray-800">
                                                    {project.title}
                                                </div>
                                                <div className="text-[11px] text-gray-500 line-clamp-1">
                                                    {project.description || ""}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-gray-600">
                                                {project.views ?? 0}
                                            </td>
                                            <td className="px-3 py-2 text-gray-600">
                                                <div className="flex flex-wrap gap-1">
                                                    {techs
                                                        .slice(0, 3)
                                                        .map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-2 py-0.5 bg-gray-100 border rounded-full text-[10px]"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    {techs.length > 3 && (
                                                        <span className="text-[10px] text-gray-400">
                                                            +{techs.length - 3}{" "}
                                                            more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-gray-500">
                                                {formatDate(project.created_at)}
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "projects.edit",
                                                            project.id
                                                        )}
                                                        className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleSingleDelete(
                                                                project.id
                                                            )
                                                        }
                                                        className="inline-flex items-center rounded-md border border-red-500 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
