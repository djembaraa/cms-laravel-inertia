import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Security({ user }) {
    const { flash, errors } = usePage().props;

    const emailForm = useForm({
        email: user.email || "",
        password: "",
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitEmail = (e) => {
        e.preventDefault();
        emailForm.post(route("settings.security.email"), {
            onSuccess: () => {
                emailForm.setData("password", "");
            },
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("settings.security.password"), {
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Security Settings
                </h2>
            }
        >
            <Head title="Security Settings" />

            <div className="mb-4 text-xs">
                <span className="text-gray-500">Settings: </span>
                <Link
                    href={route("settings.profile")}
                    className="text-gray-500 hover:underline"
                >
                    Profile
                </Link>
                <span className="text-gray-400"> • </span>
                <Link
                    href={route("settings.theme")}
                    className="text-gray-500 hover:underline"
                >
                    Theme
                </Link>
                <span className="text-gray-400"> • </span>
                <span className="font-semibold text-gray-800">Security</span>
            </div>

            <div className="space-y-3 mb-4">
                {flash?.email_success && (
                    <div className="rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                        {flash.email_success}
                    </div>
                )}
                {flash?.password_success && (
                    <div className="rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                        {flash.password_success}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form ganti email */}
                <form
                    onSubmit={submitEmail}
                    className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                >
                    <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        Change Email
                    </h3>
                    <p className="text-xs text-gray-500">
                        Untuk mengganti email, masukkan email baru dan password
                        saat ini. Email baru harus diverifikasi kembali.
                    </p>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Email
                        </label>
                        <input
                            type="email"
                            value={emailForm.data.email}
                            onChange={(e) =>
                                emailForm.setData("email", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {emailForm.errors.email && (
                            <p className="text-xs text-red-600 mt-1">
                                {emailForm.errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={emailForm.data.password}
                            onChange={(e) =>
                                emailForm.setData("password", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {emailForm.errors.password && (
                            <p className="text-xs text-red-600 mt-1">
                                {emailForm.errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={emailForm.processing}
                            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            Update Email
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={submitPassword}
                    className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                >
                    <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        Change Password
                    </h3>
                    <p className="text-xs text-gray-500">
                        Minimal 8 karakter. Demi keamanan, kamu harus memasukkan
                        password saat ini.
                    </p>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={passwordForm.data.current_password}
                            onChange={(e) =>
                                passwordForm.setData(
                                    "current_password",
                                    e.target.value
                                )
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {passwordForm.errors.current_password && (
                            <p className="text-xs text-red-600 mt-1">
                                {passwordForm.errors.current_password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={passwordForm.data.password}
                            onChange={(e) =>
                                passwordForm.setData("password", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                        {passwordForm.errors.password && (
                            <p className="text-xs text-red-600 mt-1">
                                {passwordForm.errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={passwordForm.data.password_confirmation}
                            onChange={(e) =>
                                passwordForm.setData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
