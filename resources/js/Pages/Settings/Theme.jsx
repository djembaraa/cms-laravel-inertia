import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";

export default function Theme({ theme }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        primary_color: theme.primary_color || "#111827",
        accent_color: theme.accent_color || "#4F46E5",
        font_family: theme.font_family || "Inter",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("settings.theme.update"));
    };

    const previewStyle = {
        fontFamily: data.font_family,
    };

    const headerStyle = {
        backgroundColor: data.primary_color,
        color: "#ffffff",
    };

    const buttonStyle = {
        backgroundColor: data.accent_color,
        color: "#ffffff",
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Theme Settings
                    </h2>
                    <div className="text-xs space-x-2">
                        <Link
                            href={route("settings.profile")}
                            className="text-gray-500 hover:underline"
                        >
                            Profile
                        </Link>
                        <span className="text-gray-400">•</span>
                        <span className="font-semibold text-gray-800">
                            Theme
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">Security (TODO)</span>
                    </div>
                </div>
            }
        >
            <Head title="Theme Settings" />

            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 px-4 py-2 text-sm text-green-800">
                    {flash.success}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                >
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                        Theme Options
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Primary Color
                        </label>
                        <div className="flex items-center space-x-3 mt-1">
                            <input
                                type="color"
                                value={data.primary_color}
                                onChange={(e) =>
                                    setData("primary_color", e.target.value)
                                }
                                className="h-9 w-9 cursor-pointer rounded border border-gray-200"
                            />
                            <input
                                type="text"
                                value={data.primary_color}
                                onChange={(e) =>
                                    setData("primary_color", e.target.value)
                                }
                                className="flex-1 rounded-md border-gray-300 shadow-sm text-sm"
                            />
                        </div>
                        {errors.primary_color && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.primary_color}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Accent Color (Button / Highlight)
                        </label>
                        <div className="flex items-center space-x-3 mt-1">
                            <input
                                type="color"
                                value={data.accent_color}
                                onChange={(e) =>
                                    setData("accent_color", e.target.value)
                                }
                                className="h-9 w-9 cursor-pointer rounded border border-gray-200"
                            />
                            <input
                                type="text"
                                value={data.accent_color}
                                onChange={(e) =>
                                    setData("accent_color", e.target.value)
                                }
                                className="flex-1 rounded-md border-gray-300 shadow-sm text-sm"
                            />
                        </div>
                        {errors.accent_color && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.accent_color}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Font Family
                        </label>
                        <select
                            value={data.font_family}
                            onChange={(e) =>
                                setData("font_family", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm"
                        >
                            <option value="Inter">Inter</option>
                            <option value="system-ui">
                                System UI (San Francisco / Segoe)
                            </option>
                            <option value="Poppins">Poppins</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Roboto Mono">Roboto Mono</option>
                        </select>
                        {errors.font_family && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.font_family}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            Untuk beberapa font (Poppins, Roboto) sebaiknya
                            di-load via CDN/Google Fonts nanti di layout utama.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            Save Theme
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        Live Preview
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <PreviewFrame
                            label="Web"
                            description="Layout desktop"
                            style={previewStyle}
                            headerStyle={headerStyle}
                            buttonStyle={buttonStyle}
                            size="desktop"
                        />

                        <PreviewFrame
                            label="Tablet"
                            description="Layout tablet"
                            style={previewStyle}
                            headerStyle={headerStyle}
                            buttonStyle={buttonStyle}
                            size="tablet"
                        />

                        {/* Mobile */}
                        <PreviewFrame
                            label="Mobile"
                            description="Layout mobile"
                            style={previewStyle}
                            headerStyle={headerStyle}
                            buttonStyle={buttonStyle}
                            size="mobile"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function PreviewFrame({
    label,
    description,
    style,
    headerStyle,
    buttonStyle,
    size,
}) {
    let frameClass = "";
    if (size === "desktop") frameClass = "w-full h-40";
    if (size === "tablet") frameClass = "w-40 h-40 mx-auto";
    if (size === "mobile") frameClass = "w-28 h-40 mx-auto";

    return (
        <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col">
            <div className="mb-2">
                <div className="text-xs font-semibold text-gray-700">
                    {label}
                </div>
                <div className="text-[10px] text-gray-400">{description}</div>
            </div>
            <div
                className={
                    "border border-gray-200 rounded-lg overflow-hidden flex-1 flex items-center justify-center bg-gray-50"
                }
            >
                <div
                    className={
                        "rounded-lg overflow-hidden border border-gray-200 bg-white flex flex-col"
                    }
                    style={style}
                >
                    <div
                        className="px-2 py-1 text-[10px] font-semibold"
                        style={headerStyle}
                    >
                        My CMS
                    </div>
                    <div className="p-2 flex-1 flex flex-col space-y-1">
                        <div className="h-2 w-3/4 rounded bg-gray-200" />
                        <div className="h-2 w-1/2 rounded bg-gray-200" />
                        <div className="flex-1" />
                        <button
                            className="mt-1 rounded px-2 py-1 text-[9px] font-semibold"
                            style={buttonStyle}
                        >
                            Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
