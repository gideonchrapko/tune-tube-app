export default function DashboardHome() {
  return (
    <div className="bg-gray-100 h-full pt-24">
      <div className="flex items-center h-[105px] px-8 py-6">
        <p className="font-bold text-black text-6xl">Dashboard</p>
      </div>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a
              href="/dashboard/creator-analytics"
              className="bg-white rounded-xl shadow-lg p-20 text-center hover:bg-gray-100 transition duration-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                Creator Analytics
              </h2>
            </a>

            <a
              href="/dashboard/sounds"
              className="bg-white rounded-xl shadow-lg p-20 text-center hover:bg-gray-100 transition duration-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900">Sounds</h2>
            </a>
            <a
              href="/dashboard/sync"
              className="bg-white rounded-xl shadow-lg p-20 text-center hover:bg-gray-100 transition duration-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900">Sync</h2>
            </a>

            <a
              href="/dashboard/settings"
              className="bg-white rounded-xl shadow-lg p-20 text-center hover:bg-gray-100 transition duration-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
