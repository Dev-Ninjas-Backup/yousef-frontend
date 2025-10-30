export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
          <p className="mt-2 text-sm text-blue-600">View all listings</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">2,456</p>
          <p className="mt-2 text-sm text-green-600">+18% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Messages</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
          <p className="mt-2 text-sm text-orange-600">3 unread messages</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Listings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">2023 Sunseeker 76 Yacht</p>
              <p className="text-sm text-gray-500">156 views • Listed 2 weeks ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">2022 Azimut 60 Flybridge</p>
              <p className="text-sm text-gray-500">89 views • Listed 1 month ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">2021 Princess V50</p>
              <p className="text-sm text-gray-500">234 views • Listed 3 months ago</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
              Pending Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
