export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Saved Favorites</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">15</p>
          <p className="mt-2 text-sm text-blue-600">View favorites</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Active Inquiries</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">3</p>
          <p className="mt-2 text-sm text-orange-600">2 pending responses</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Messages</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
          <p className="mt-2 text-sm text-green-600">1 new message</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Yachts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-md mb-3"></div>
            <h3 className="font-semibold text-gray-900">2023 Sunseeker 76 Yacht</h3>
            <p className="text-sm text-gray-500 mt-1">Fort Lauderdale, FL</p>
            <p className="text-lg font-bold text-blue-600 mt-2">$2,450,000</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 rounded-md mb-3"></div>
            <h3 className="font-semibold text-gray-900">2022 Azimut 60 Flybridge</h3>
            <p className="text-sm text-gray-500 mt-1">Miami, FL</p>
            <p className="text-lg font-bold text-blue-600 mt-2">$1,850,000</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Added to favorites</p>
              <p className="text-sm text-gray-500">2023 Sunseeker 76 Yacht</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Sent inquiry</p>
              <p className="text-sm text-gray-500">2022 Princess V50</p>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
