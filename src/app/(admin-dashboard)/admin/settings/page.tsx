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
  const [platformDescription, setPlatformDescription] = useState("");
  const [sparePartsMonthly, setSparePartsMonthly] = useState("");
  const [perListingPrice, setPerListingPrice] = useState("");

  // Categories State (Restored)
  const [categories, setCategories] = useState<PartsCategory[]>(initialCategories);

useEffect(() => {
    // Check if data actually exists before trying to destructure
    console.log(platformData)
    if (platformData?.data) {
      console.log("Setting Platform State:", platformData.data);
      setPlatformName(platformData.data.platformName || "");
      setSupportEmail(platformData.data.supportEmail || "");
      setPlatformDescription(platformData.data.PlatformDescription || "");
    }
  }, [platformData]); // Run when platformData changes

  useEffect(() => {
    if (paymentData?.data) {
      console.log("Setting Payment State:", paymentData.data);
      setSparePartsMonthly(paymentData.data.sparePartsMonthly || "");
      setPerListingPrice(paymentData.data.perListingPrice || "");
    }
  }, [paymentData]); // Run when paymentData changes

  const handleSaveChanges = async () => {
    try {
      await updatePlatform({
        platformName,
        supportEmail,
        PlatformDescription: platformDescription
      }).unwrap();

      await updatePayment({
        sparePartsMonthly,
        perListingPrice
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
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
        <div className="mt-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
          <textarea
            value={platformDescription}
            onChange={(e) => setPlatformDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />
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
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-5">Manage Subscription</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spare Parts Monthly Fee</label>
            <input
              type="text"
              value={sparePartsMonthly}
              onChange={(e) => setSparePartsMonthly(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Per Listing Price</label>
            <input
              type="text"
              value={perListingPrice}
              onChange={(e) => setPerListingPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <p className="text-sm text-gray-900">Free Promotional Listing Status</p>
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
    </div>
  );
}