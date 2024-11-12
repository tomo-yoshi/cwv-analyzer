import Link from "next/link";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r">
        <nav className="pl-6 p-4 space-y-1">
          <h2 className="px-3 text-lg font-semibold mb-4">Settings</h2>
          <Link
            href="/settings/organization"
            className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
          >
            Organization
          </Link>
          <Link
            href="/settings/projects"
            className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100"
          >
            Projects
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}