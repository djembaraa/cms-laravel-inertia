import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ project }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {project.title}
                </h2>
            }
        >
            <Head title={project.title} />

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                {project.media_path && (
                    <img
                        src={`/storage/${project.media_path}`}
                        alt={project.title}
                        className="max-h-64 rounded-md object-cover"
                    />
                )}

                <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{project.description}</p>
                </div>

                <div className="pt-4 border-t text-sm text-gray-600 space-y-1">
                    <div>
                        <span className="font-semibold">Techstack:</span>{" "}
                        {(project.techstack || []).join(", ")}
                    </div>
                    <div className="text-xs text-gray-400">
                        Views: {project.views} • Disk usage:{" "}
                        {Math.round((project.disk_usage || 0) / 1024)} KB
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
