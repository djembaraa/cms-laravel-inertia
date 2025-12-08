import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Profile({ user }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        display_name: user.display_name || "",
        avatar: null,
        project_logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("settings.profile.update"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile Settings
                </h2>
            }
        >
            <Head title="Profile Settings" />

            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-lg shadow-sm space-y-6 max-w-xl"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.name && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Display Name (untuk sidebar, dashboard)
                    </label>
                    <input
                        type="text"
                        value={data.display_name}
                        onChange={(e) =>
                            setData("display_name", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder={user.name}
                    />
                    {errors.display_name && (
                        <p className="text-xs text-red-600 mt-1">
                            {errors.display_name}
                        </p>
                    )}
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Avatar
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("avatar", e.target.files[0])
                            }
                            className="mt-1 block w-full text-sm"
                        />
                        {errors.avatar && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.avatar}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">
                            Optional. Digunakan di dropdown user bagian atas.
                        </p>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-1">
                            Current
                        </span>
                        {user.avatar ? (
                            <img
                                src={`/storage/${user.avatar}`}
                                alt="Avatar"
                                className="h-12 w-12 rounded-full object-cover border"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                N/A
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Project Logo (Logo CMS)
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("project_logo", e.target.files[0])
                            }
                            className="mt-1 block w-full text-sm"
                        />
                        {errors.project_logo && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.project_logo}
                            </p>
                        )}
                        <p className="mt-1 text-xs text-gray-400">
                            Logo ini bisa ditampilkan di sidebar / header CMS.
                        </p>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 mb-1">
                            Current
                        </span>
                        {user.project_logo ? (
                            <img
                                src={`/storage/${user.project_logo}`}
                                alt="Logo"
                                className="h-12 w-12 rounded-md object-cover border bg-white"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                N/A
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
