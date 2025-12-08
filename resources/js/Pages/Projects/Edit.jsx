import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Edit({ project }) {
    const {
        data,
        setData,
        post: put,
        processing,
        errors,
    } = useForm({
        title: project.title || "",
        description: project.description || "",
        techstack: (project.techstack || []).join(", "),
        media: null,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("projects.update", project.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Project
                </h2>
            }
        >
            <Head title="Edit Project" />

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-lg shadow-sm space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.title && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows="5"
                    />
                    {errors.description && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Techstack (pisahkan dengan koma)
                    </label>
                    <input
                        type="text"
                        value={data.techstack}
                        onChange={(e) => setData("techstack", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.techstack && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.techstack}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Media (isi kalau mau ganti file)
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setData("media", e.target.files[0])}
                        className="mt-1 block w-full text-sm"
                    />
                    {errors.media && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.media}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        href={route("projects.index")}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Back
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        Update
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
