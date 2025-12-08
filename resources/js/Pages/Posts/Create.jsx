import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        footer: "",
        media: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("posts.store"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Post
                </h2>
            }
        >
            <Head title="Create Post" />

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
                        Body
                    </label>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData("body", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows="6"
                    />
                    {errors.body && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.body}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Footer
                    </label>
                    <input
                        type="text"
                        value={data.footer}
                        onChange={(e) => setData("footer", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.footer && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.footer}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Media (optional)
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
                        href={route("posts.index")}
                        className="text-sm text-gray-600 hover:underline"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
