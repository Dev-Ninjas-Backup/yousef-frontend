"use client";

import { useGetPaymentConfigQuery, useGetPlatformSettingQuery, useToggleAutoApproveGaragesMutation, useToggleAutoEmailNotificationMutation, useUpdateFreePromotionalStatusMutation, useUpdatePaymentConfigMutation, useUpdatePlatformSettingMutation } from "@/store/fetures/setting.api";
import { useEffect, useState } from "react";
import { LuPlus, LuPencil, LuTrash2, LuSave, LuRotateCcw } from "react-icons/lu";
import { toast } from "react-toastify";
import PartsCategorySection from "./PartsCategorySection";

// Types
interface PartsCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

const initialCategories: PartsCategory[] = [
  { id: "1", name: "Engine Parts", count: 320, icon: "⚙️" },
  { id: "2", name: "Brakes", count: 180, icon: "🔧" },
  { id: "3", name: "Suspension", count: 120, icon: "🔩" },
  { id: "4", name: "Electrical", count: 120, icon: "⚡" },
  { id: "5", name: "Body Parts", count: 90, icon: "🚗" },
];

export default function PlatformSettingsPage() {
  // API Hooks
  const { data: platformData, isLoading: isPlatformLoading } = useGetPlatformSettingQuery();
  const { data: paymentData, isLoading: isPaymentLoading } = useGetPaymentConfigQuery();
  
  const [updatePlatform] = useUpdatePlatformSettingMutation();
  const [updatePayment] = useUpdatePaymentConfigMutation();
  const [toggleGarageApproval] = useToggleAutoApproveGaragesMutation();
  const [toggleEmailNotif] = useToggleAutoEmailNotificationMutation();
  const [togglePromoStatus] = useUpdateFreePromotionalStatusMutation();

  // Local State for Forms
  const [platformName, setPlatformName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [sparePartsMonthly, setSparePartsMonthly] = useState("");
  const [perListingPrice, setPerListingPrice] = useState("");
  const [freePromotionalListings, setFreePromotionalListings] = useState("");
  const [monthlyBasicPrice, setMonthlyBasicPrice] = useState("");
  const [monthlyProPrice, setMonthlyProPrice] = useState("");
  const [monthlyGaragePrice, setMonthlyGaragePrice] = useState("");
  const [promotionalAdPrice3Days, setPromotionalAdPrice3Days] = useState("");
  const [promotionalAdPrice7Days, setPromotionalAdPrice7Days] = useState("");

  // Confirmation Modal States
  const [showFirstConfirm, setShowFirstConfirm] = useState(false);
  const [showSecondConfirm, setShowSecondConfirm] = useState(false);

  // Categories State (Restored)
  const [categories, setCategories] = useState<PartsCategory[]>(initialCategories);

useEffect(() => {
    // Check if data actually exists before trying to destructure
    console.log(platformData)
    if (platformData?.data) {
      console.log("Setting Platform State:", platformData.data);
      setPlatformName(platformData.data.platformName || "");
      setSupportEmail(platformData.data.supportEmail || "");
    }
  }, [platformData]); // Run when platformData changes

  useEffect(() => {
    if (paymentData?.data) {
      console.log("Setting Payment State:", paymentData.data);
      setSparePartsMonthly(paymentData.data.sparePartsMonthly || "");
      setPerListingPrice(paymentData.data.perListingPrice || "");
      setFreePromotionalListings(paymentData.data.freePromotionalListings || "");
      setMonthlyBasicPrice(paymentData.data.monthlyBasicPrice || "");
      setMonthlyProPrice(paymentData.data.monthlyProPrice || "");
      setMonthlyGaragePrice(paymentData.data.monthlyGaragePrice || "");
      setPromotionalAdPrice3Days(paymentData.data.promotionalAdPrice3Days || "");
      setPromotionalAdPrice7Days(paymentData.data.promotionalAdPrice7Days || "");
    }
  }, [paymentData]); // Run when paymentData changes

  const handleSaveChanges = () => {
    setShowFirstConfirm(true);
  };

  const handleFirstConfirm = () => {
    setShowFirstConfirm(false);
    setShowSecondConfirm(true);
  };

  const handleSecondConfirm = async () => {
    setShowSecondConfirm(false);
    try {
      await updatePlatform({
        platformName,
        supportEmail,
        PlatformDescription: ""
      }).unwrap();

      await updatePayment({
        sparePartsMonthly,
        perListingPrice,
        freePromotionalListings,
        monthlyBasicPrice,
        monthlyProPrice,
        monthlyGaragePrice,
        promotionalAdPrice3Days,
        promotionalAdPrice7Days,
      }).unwrap();

      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const handleToggleGarageApproval = async () => {
    try {
      await toggleGarageApproval().unwrap();
      toast.success("Garage approval setting updated");
    } catch (error) { toast.error("Update failed"); }
  };

  const handleToggleEmail = async () => {
    try {
      await toggleEmailNotif().unwrap();
      toast.success("Email notification setting updated");
    } catch (error) { toast.error("Update failed"); }
  };

  const handleTogglePromo = async () => {
    try {
        await togglePromoStatus().unwrap();
        toast.success("Promotional status updated");
      } catch (error) { toast.error("Update failed"); }
  };

  // Category Handlers (Restored)
  const handleAddCategory = () => console.log("Adding category...");
  const handleEditCategory = (id: string) => console.log("Editing:", id);
  const handleDeleteCategory = (id: string) => setCategories(categories.filter(c => c.id !== id));

  if (isPlatformLoading || isPaymentLoading) return <div className="p-10 text-center text-gray-500">Loading Settings...</div>;

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage platform configuration and preferences</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Platform Name - temporarily hidden
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Approval Settings */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">Approval & Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-approve Garages</p>
              <p className="text-xs text-gray-500">Automatically approve new garage registrations</p>
            </div>
            <button
              onClick={handleToggleGarageApproval}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-600"
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive alerts when items need approval</p>
            </div>
            <button
              onClick={handleToggleEmail}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-blue-600"
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
            </button>
          </div>
        </div>
      </div>

      {/* RESTORED: Parts Categories Section */}
      {/* <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Parts Categories</h2>
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
                  <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                  <p className="text-xs text-gray-500">{category.count} parts</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEditCategory(category.id)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <LuPencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteCategory(category.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <PartsCategorySection />

      {/* Manage Subscription (Payment Config) */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">Manage Listing & Plan Settings</h2>
        
        {/* Row 1: General Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Commented out Spare Parts Monthly Fee (AED) field since front-end tier pricing uses Basic/Pro/Garage Monthly Tiers instead */}
          {/* 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spare Parts Monthly Fee (AED)</label>
            <input
              type="text"
              value={sparePartsMonthly}
              onChange={(e) => setSparePartsMonthly(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Per Listing Price (AED)</label>
            <input
              type="text"
              value={perListingPrice}
              onChange={(e) => setPerListingPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Free Listing Limit (e.g. 3)</label>
            <input
              type="text"
              value={freePromotionalListings}
              onChange={(e) => setFreePromotionalListings(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Row 2: Monthly Subscriptions */}
        <h3 className="text-sm font-bold text-gray-800 mb-3 border-t pt-4">Monthly Plan Price Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Basic Seller Plan (AED)</label>
            <input
              type="text"
              value={monthlyBasicPrice}
              onChange={(e) => setMonthlyBasicPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pro Seller Plan (AED)</label>
            <input
              type="text"
              value={monthlyProPrice}
              onChange={(e) => setMonthlyProPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Garage Partner Plan (AED)</label>
            <input
              type="text"
              value={monthlyGaragePrice}
              onChange={(e) => setMonthlyGaragePrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Row 3: Promotions */}
        <h3 className="text-sm font-bold text-gray-800 mb-3 border-t pt-4">Promotion Durations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">7 Days Promotion Price (AED)</label>
            <input
              type="text"
              value={promotionalAdPrice3Days}
              onChange={(e) => setPromotionalAdPrice3Days(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">30 Days Promotion Price (AED)</label>
            <input
              type="text"
              value={promotionalAdPrice7Days}
              onChange={(e) => setPromotionalAdPrice7Days(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Toggle Status */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Free Promotional Listing Status</p>
              <p className="text-xs text-gray-500">Enable/disable free listings on the platform</p>
            </div>
            <button
              onClick={handleTogglePromo}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentData?.data?.freePromotionalListingStatus ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                paymentData?.data?.freePromotionalListingStatus ? "translate-x-6" : "translate-x-1"
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <button
          onClick={handleSaveChanges}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <LuSave className="w-4 h-4" />
          Save Changes
        </button>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
          <LuRotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>

      {/* First Confirmation Modal */}
      {showFirstConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 relative transform transition-all scale-100">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Change Settings / Plan Prices?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to change your plan?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowFirstConfirm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-650 dark:text-gray-200 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFirstConfirm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors shadow-sm"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Confirmation Modal (Final) */}
      {showSecondConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700 relative transform transition-all scale-100">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confirm Settings & Price Update</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              This action will update your subscription. Do you want to proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSecondConfirm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-650 dark:text-gray-200 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSecondConfirm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors shadow-sm"
              >
                Yes, Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}