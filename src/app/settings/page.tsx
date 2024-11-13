import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow">
            <h2 className="text-lg font-medium mb-2">Organization Settings</h2>
            <p className="text-gray-600 mb-4">
              Manage your organizations, members, and roles
            </p>
            <Link
              href="/settings/organization"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage Organizations →
            </Link>
          </div>
          
          <div className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow">
            <h2 className="text-lg font-medium mb-2">Project Settings</h2>
            <p className="text-gray-600 mb-4">
              View and manage your projects across organizations
            </p>
            <Link
              href="/settings/projects"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Manage Projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}