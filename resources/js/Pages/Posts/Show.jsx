import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ post }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {post.title}
                </h2>
            }
        >
            <Head title={post.title} />

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                {post.media_path && (
                    <img
                        src={`/storage/${post.media_path}`}
                        alt={post.title}
                        className="max-h-64 rounded-md object-cover"
                    />
                )}

                <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{post.body}</p>
                </div>

                {post.footer && (
                    <div className="pt-4 border-t text-sm text-gray-500">
                        {post.footer}
                    </div>
                )}

                <div className="pt-4 text-xs text-gray-400">
                    Views: {post.views} • Likes: {post.likes_count} • Comments:{" "}
                    {post.comments_count}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
