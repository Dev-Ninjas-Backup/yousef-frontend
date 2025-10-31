import React from "react";
import {
  LuInfo,
  LuPackage,
  LuRefreshCcw,
  LuTag,
  LuDollarSign,
} from "react-icons/lu";

interface PricingConfigProps {
  sparePartsSubscription: string;
  setSparePartsSubscription: (value: string) => void;
  autoRenewalPerListing: string;
  setAutoRenewalPerListing: (value: string) => void;
  promotionalAdPriceSpare: string;
  setPromotionalAdPriceSpare: (value: string) => void;
  garagePromotionalAdPrice: string;
  setGaragePromotionalAdPrice: (value: string) => void;
  freePromotionalListings: string;
  setFreePromotionalListings: (value: string) => void;
  platformFeeAfter2Listings: boolean;
  setPlatformFeeAfter2Listings: (value: boolean) => void;
  platformFeeAfter3Months: boolean;
  setPlatformFeeAfter3Months: (value: boolean) => void;
}

const PricingConfig: React.FC<PricingConfigProps> = ({
  sparePartsSubscription,
  setSparePartsSubscription,
  autoRenewalPerListing,
  setAutoRenewalPerListing,
  promotionalAdPriceSpare,
  setPromotionalAdPriceSpare,
  garagePromotionalAdPrice,
  setGaragePromotionalAdPrice,
  freePromotionalListings,
  setFreePromotionalListings,
  platformFeeAfter2Listings,
  setPlatformFeeAfter2Listings,
  platformFeeAfter3Months,
  setPlatformFeeAfter3Months,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
      <div className="mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Pricing Configuration
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Configure platform pricing for subscriptions, listings, and
          promotional features
        </p>
      </div>

      {/* Warning Alert */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
        <LuInfo className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          Changes to pricing will apply to new listings and subscriptions
          immediately. Existing subscriptions will be updated on their next
          renewal date.
        </p>
      </div>

      <div className="space-y-6">
        {/* Spare Parts Monthly Subscription */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuPackage className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Spare Parts Monthly Subscription
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Monthly subscription for unlimited spare parts listings
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={sparePartsSubscription}
              onChange={(e) => setSparePartsSubscription(e.target.value)}
              className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-600">AED</span>
            <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Current: 100 AED
            </span>
          </div>
        </div>

        {/* Auto-Renewal Per Listing */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuRefreshCcw className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Auto-Renewal Per Listing
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Monthly charge for auto-renewing individual listings (without
            subscription)
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={autoRenewalPerListing}
              onChange={(e) => setAutoRenewalPerListing(e.target.value)}
              className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-600">AED</span>
            <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              Current: 3 AED
            </span>
          </div>
        </div>

        {/* Promotional Ad Price (Spare Parts Listings) */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuTag className="w-5 h-5 text-orange-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Promotional Ad Price (Spare Parts Listings)
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            One-time fee to promote a spare part listing in homepage carousel
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={promotionalAdPriceSpare}
              onChange={(e) => setPromotionalAdPriceSpare(e.target.value)}
              className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-600">AED</span>
            <span className="ml-auto px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              Current: 20 AED
            </span>
          </div>
        </div>

        {/* Garage Promotional Ad Price */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuTag className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Garage Promotional Ad Price
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Price per garage promotional ad after free listings (3 free, then
            paid)
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={garagePromotionalAdPrice}
              onChange={(e) => setGaragePromotionalAdPrice(e.target.value)}
              className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="text-sm text-gray-600">AED</span>
            <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Current: 20 AED
            </span>
          </div>
        </div>

        {/* Free Promotional Listings */}
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <LuDollarSign className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Free Promotional Listings
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Number of free promotional ads for garages and spare parts before
            charging
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              value={freePromotionalListings}
              onChange={(e) => setFreePromotionalListings(e.target.value)}
              className="w-24 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Current: 2 free
            </span>
          </div>
        </div>

        {/* Platform Fee Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <p className="text-sm text-gray-900">
              Platform fee will be applied after the first 2 free listings
            </p>
            <button
              onClick={() =>
                setPlatformFeeAfter2Listings(!platformFeeAfter2Listings)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                platformFeeAfter2Listings ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  platformFeeAfter2Listings ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <p className="text-sm text-gray-900">
              Platform fee will be applied after the first 3 month
            </p>
            <button
              onClick={() =>
                setPlatformFeeAfter3Months(!platformFeeAfter3Months)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                platformFeeAfter3Months ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  platformFeeAfter3Months ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingConfig;
