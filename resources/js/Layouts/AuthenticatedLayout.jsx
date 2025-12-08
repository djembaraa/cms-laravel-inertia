import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const page = usePage();
    const auth = page.props.auth ?? {};
    const user = auth.user ?? {};

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isSettingsRoute =
        route().current("settings.profile") ||
        route().current("settings.theme") ||
        false;

    const [settingsOpen, setSettingsOpen] = useState(isSettingsRoute);

    return (
        <div className="min-h-screen flex bg-gray-100">
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="p-4 border-b flex items-center space-x-3">
                    {user.project_logo && (
                        <img
                            src={`/storage/${user.project_logo}`}
                            alt="Logo"
                            className="h-8 w-8 rounded-md object-cover border"
                        />
                    )}
                    <div>
                        <div className="font-bold text-xl">
                            {user.display_name || user.name || "User"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {user.name ?? "User"}
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-2 space-y-1 text-sm">
                    <NavItem
                        href={route("dashboard")}
                        label="Home"
                        active={route().current("dashboard")}
                    />

                    <NavItem
                        href={route("posts.index")}
                        label="Posts"
                        active={route().current("posts.*")}
                    />

                    <NavItem
                        href={route("projects.index")}
                        label="Projects"
                        active={route().current("projects.*")}
                    />

                    <NavItem
                        href={route("static.index")}
                        label="Static"
                        active={route().current("static.index")}
                    />

                    <NavItem
                        href={route("notifications.index")}
                        label="Notifications"
                        active={route().current("notifications.index")}
                    />

                    <SettingsGroup
                        open={settingsOpen}
                        setOpen={setSettingsOpen}
                    />
                </nav>

                <div className="border-t p-2">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <nav className="border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex" />

                            <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                >
                                                    {user.display_name ||
                                                        user.name ||
                                                        "User"}

                                                    <svg
                                                        className="-me-0.5 ms-2 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("settings.profile")}
                                            >
                                                Profile Settings
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previous) => !previous
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name ?? "User"}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email ?? ""}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("settings.profile")}
                                >
                                    Profile Settings
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white border-b">
                        <div className="max-w-7xl mx-auto py-4 px-6">
                            {header}
                        </div>
                    </header>
                )}

                <div className="max-w-7xl mx-auto p-6 flex-1 w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, label, active = false }) {
    return (
        <Link
            href={href}
            className={
                "block px-3 py-2 rounded-md " +
                (active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100")
            }
        >
            {label}
        </Link>
    );
}

function SettingsGroup({ open, setOpen }) {
    const isProfileActive = route().current("settings.profile");
    const isThemeActive = route().current("settings.theme");
    const isSecurityActive = route().current("settings.security");

    const parentActive = isProfileActive || isThemeActive || isSecurityActive;

    return (
        <div className="space-y-1">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm " +
                    (parentActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100")
                }
            >
                <span>Settings</span>
                <span className="text-xs">{open ? "▾" : "▸"}</span>
            </button>

            {open && (
                <div className="ml-4 space-y-1">
                    <SettingsSubItem
                        href={route("settings.profile")}
                        label="Profile"
                        active={isProfileActive}
                    />
                    <SettingsSubItem
                        href={route("settings.theme")}
                        label="Theme"
                        active={isThemeActive}
                    />
                    <SettingsSubItem
                        href={route("settings.security")}
                        label="Security"
                        active={isSecurityActive}
                    />
                </div>
            )}
        </div>
    );
}

function SettingsSubItem({ href, label, active }) {
    return (
        <Link
            href={href}
            className={
                "block px-3 py-1.5 rounded-md text-xs " +
                (active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100")
            }
        >
            {label}
        </Link>
    );
}
