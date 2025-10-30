"use client";

import { useState } from "react";
import { LuPlus, LuPencil, LuTrash2, LuSave, LuRotateCcw } from "react-icons/lu";

// Types
interface PartsCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

// Mock data
const initialCategories: PartsCategory[] = [
  { id: "1", name: "Engine Parts", count: 320, icon: "⚙️" },
  { id: "2", name: "Brakes", count: 180, icon: "🔧" },
  { id: "3", name: "Suspension", count: 120, icon: "🔩" },
  { id: "4", name: "Electrical", count: 120, icon: "⚡" },
  { id: "5", name: "Body Parts", count: 90, icon: "🚗" },
];

export default function PlatformSettingsPage() {
  // General Settings
  const [platformName, setPlatformName] = useState("Precision Auto Care");
  const [supportEmail, setSupportEmail] = useState("support@precisionautocare.com");
  const [platformDescription, setPlatformDescription] = useState(
    "Your trusted platform for automotive services and spare parts"
  );

  // Approval Settings
  const [autoApproveGarages, setAutoApproveGarages] = useState(false);
  const [autoApproveParts, setAutoApproveParts] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Parts Categories
  const [categories, setCategories] = useState<PartsCategory[]>(initialCategories);

  // Subscription Settings
  const [garageListingFee, setGarageListingFee] = useState("100 AED");
  const [partsListingFee, setPartsListingFee] = useState("30 AED");
  const [feeUpdateAfter2Months, setFeeUpdateAfter2Months] = useState(true);
  const [feeUpdateAfter3Months, setFeeUpdateAfter3Months] = useState(true);

  const handleSaveChanges = () => {
    console.log("Saving changes...");
    // Add save logic here
  };

  const handleResetToDefaults = () => {
    console.log("Resetting to defaults...");
    // Add reset logic here
  };

  const handleAddCategory = () => {
    console.log("Adding new category...");
    // Add new category logic here
  };

  const handleEditCategory = (id: string) => {
    console.log("Editing category:", id);
    // Add edit logic here
  };

  const handleDeleteCategory = (id: string) => {
    console.log("Deleting category:", id);
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Platform Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage platform configuration and preferences
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
          General Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Platform Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Support Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Platform Description */}
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform Description
          </label>
          <textarea
            value={platformDescription}
            onChange={(e) => setPlatformDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      {/* Approval Settings */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
          Approval Settings
        </h2>

        <div className="space-y-4">
          {/* Auto-approve Garages */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Auto-approve Garages
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Automatically approve new garage registrations
              </p>
            </div>
            <button
              onClick={() => setAutoApproveGarages(!autoApproveGarages)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                autoApproveGarages ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoApproveGarages ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Auto-approve Parts */}
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Auto-approve Parts
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Automatically approve new spare parts submissions
              </p>
            </div>
            <button
              onClick={() => setAutoApproveParts(!autoApproveParts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                autoApproveParts ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoApproveParts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Email Notifications for New Submissions
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Receive email alerts when items need approval
              </p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Parts Categories */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Parts Categories
          </h2>
          <button
            onClick={handleAddCategory}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LuPlus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500">{category.count} parts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditCategory(category.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <LuPencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Subscription */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">
          Manage Subscription
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Platform fee for garage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform fee for garage
            </label>
            <input
              type="text"
              value={garageListingFee}
              onChange={(e) => setGarageListingFee(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Platform fee for parts listing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform fee for parts listing
            </label>
            <input
              type="text"
              value={partsListingFee}
              onChange={(e) => setPartsListingFee(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Fee Update Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <p className="text-sm text-gray-900">
              Platform fee will be updated after the first 2 two filings
            </p>
            <button
              onClick={() => setFeeUpdateAfter2Months(!feeUpdateAfter2Months)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                feeUpdateAfter2Months ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  feeUpdateAfter2Months ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <p className="text-sm text-gray-900">
              Platform fee will be updated after the first 3 month
            </p>
            <button
              onClick={() => setFeeUpdateAfter3Months(!feeUpdateAfter3Months)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                feeUpdateAfter3Months ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  feeUpdateAfter3Months ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={handleSaveChanges}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuSave className="w-4 h-4" />
          Save Changes
        </button>
        <button
          onClick={handleResetToDefaults}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <LuRotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}