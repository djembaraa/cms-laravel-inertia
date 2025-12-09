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

export default function PostsIndex({ posts }) {
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
        body: "",
        media: null,
        footer: "",
    });

    const [selectedIds, setSelectedIds] = useState([]);

    const handleToggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (!posts || posts.length === 0) return;
        if (selectedIds.length === posts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(posts.map((p) => p.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        if (!window.confirm("Are you sure delete selected posts?")) {
            return;
        }

        router.delete(route("posts.bulk-destroy"), {
            data: { ids: selectedIds },
            onSuccess: () => setSelectedIds([]),
        });
    };

    const handleSingleDelete = (id) => {
        if (!window.confirm("Are you sure delete this post?")) return;

        router.delete(route("posts.destroy", id));
    };

    const submitCreate = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
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
                        Posts
                    </h2>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowCreate((v) => !v)}
                            className="inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
                        >
                            {showCreate ? "Close Form" : "Create Post"}
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
            <Head title="Posts" />

            {/* FLASH MESSAGE */}
            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            {showCreate && (
                <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                        Create New Post
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
                                Body
                            </label>
                            <textarea
                                rows={4}
                                value={data.body}
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                            />
                            {errors.body && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.body}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Media (optional)
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
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700">
                                Footer (optional)
                            </label>
                            <textarea
                                rows={2}
                                value={data.footer}
                                onChange={(e) =>
                                    setData("footer", e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                            />
                            {errors.footer && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.footer}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                Save Post
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-4 py-3 border-b flex items-center justify-between text-xs text-gray-600">
                    <span>List Posts</span>
                    <span>
                        Total:{" "}
                        {Array.isArray(posts)
                            ? posts.length
                            : posts?.data?.length || 0}
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
                                            posts &&
                                            Array.isArray(posts) &&
                                            posts.length > 0 &&
                                            selectedIds.length === posts.length
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
                                    Comments
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
                            {(!posts || posts.length === 0) && (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-4 py-4 text-center text-xs text-gray-500"
                                    >
                                        Belum ada post.
                                    </td>
                                </tr>
                            )}

                            {Array.isArray(posts) &&
                                posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(
                                                    post.id
                                                )}
                                                onChange={() =>
                                                    handleToggleSelect(post.id)
                                                }
                                            />
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="font-semibold text-gray-800">
                                                {post.title}
                                            </div>
                                            <div className="text-[11px] text-gray-500 line-clamp-1">
                                                {post.excerpt || ""}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-gray-600">
                                            {post.views ?? 0}
                                        </td>
                                        <td className="px-3 py-2 text-gray-600">
                                            {post.comments_count ?? 0}
                                        </td>
                                        <td className="px-3 py-2 text-gray-500">
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route(
                                                        "posts.edit",
                                                        post.id
                                                    )}
                                                    className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-[11px] text-gray-700 hover:bg-gray-50"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSingleDelete(
                                                            post.id
                                                        )
                                                    }
                                                    className="inline-flex items-center rounded-md border border-red-500 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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
