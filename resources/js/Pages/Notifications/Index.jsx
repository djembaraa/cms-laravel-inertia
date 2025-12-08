import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

export default function Index({ unread, read }) {
    const { flash } = usePage().props;

    const markAllRead = () => {
        router.post(route("notifications.markAllRead"));
    };

    const markOneRead = (id) => {
        router.post(route("notifications.markRead", id));
    };

    const formatDate = (d) => {
        if (!d) return "";
        return new Date(d).toLocaleString();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Notifications
                </h2>
            }
        >
            <Head title="Notifications" />

            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                            Unread
                        </h3>
                        {unread.length > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {unread.length === 0 && (
                        <p className="text-xs text-gray-400">
                            Tidak ada notif baru.
                        </p>
                    )}

                    <ul className="space-y-2">
                        {unread.map((n) => (
                            <li
                                key={n.id}
                                className="flex items-start justify-between rounded-md border border-blue-100 bg-blue-50 px-3 py-2"
                            >
                                <div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {n.data.title || "Notification"}
                                    </div>
                                    {n.data.message && (
                                        <div className="text-xs text-gray-700 mt-1">
                                            {n.data.message}
                                        </div>
                                    )}
                                    {n.data.type && (
                                        <div className="text-[10px] uppercase text-blue-500 mt-1">
                                            {n.data.type}
                                        </div>
                                    )}
                                    <div className="text-[10px] text-gray-400 mt-1">
                                        {formatDate(n.created_at)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => markOneRead(n.id)}
                                    className="ml-2 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white hover:bg-blue-500"
                                >
                                    Mark read
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Read
                    </h3>

                    {read.length === 0 && (
                        <p className="text-xs text-gray-400">
                            Belum ada riwayat notif.
                        </p>
                    )}

                    <ul className="space-y-2">
                        {read.map((n) => (
                            <li
                                key={n.id}
                                className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-800">
                                            {n.data.title || "Notification"}
                                        </div>
                                        {n.data.message && (
                                            <div className="text-xs text-gray-700 mt-1">
                                                {n.data.message}
                                            </div>
                                        )}
                                        {n.data.type && (
                                            <div className="text-[10px] uppercase text-gray-400 mt-1">
                                                {n.data.type}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-gray-400">
                                        {formatDate(n.read_at || n.created_at)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
