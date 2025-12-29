"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { useGetTransactionHistoryQuery } from "@/store/api/garageAdminApis/subscription/subscription";

const TransactionHistory = () => {
  const { data, isLoading } = useGetTransactionHistoryQuery();
  const transactions = data || [];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 text-xs whitespace-nowrap">
            <CheckCircle className="w-3 h-3" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 gap-1 text-xs whitespace-nowrap">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 gap-1 text-xs whitespace-nowrap">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge className="text-xs">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl border w-full">
        <p className="text-center text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  // if (transactions.length === 0) {
  //   return (
  //     <div className="bg-white p-6 rounded-xl border w-full">
  //       <h3 className="font-semibold text-lg text-gray-900 mb-2">
  //         Transaction History
  //       </h3>
  //       <p className="text-center text-gray-500 py-8">No transactions yet</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
            Transaction History
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            View all your billing transactions
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 w-full sm:w-auto text-xs sm:text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                ID
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Date
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Description
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Method
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Amount
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Status
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions?.map((transaction) => (
              <tr key={transaction.transactionId} className="hover:bg-gray-50">
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                  {transaction.transactionId}
                </td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {transaction.paymentType} Subscription
                </td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                  {transaction.paymentMethod}
                </td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">
                  {formatAmount(transaction.amount, transaction.currency)}
                </td>
                <td className="px-3 sm:px-4 py-3">
                  {getStatusBadge(transaction.status)}
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <Button variant="ghost" size="sm" className="text-xs h-8">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet View (4-5 columns) */}
      <div className="hidden md:lg:block lg:hidden border rounded-lg overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">
                ID
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">
                Date
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">
                Description
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">
                Amount
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-900">
                  {transaction.transactionId}
                </td>
                <td className="px-3 py-2 text-gray-900">{formatDate(transaction.createdAt)}</td>
                <td className="px-3 py-2 text-gray-900 truncate">
                  {transaction.paymentType} Subscription
                </td>
                <td className="px-3 py-2 text-gray-900">
                  {formatAmount(transaction.amount, transaction.currency)}
                </td>
                <td className="px-3 py-2">
                  {getStatusBadge(transaction.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2 sm:space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.transactionId} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between gap-2 pb-2 border-b">
              <div>
                <p className="text-xs text-gray-500">ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.transactionId}
                </p>
              </div>
              {getStatusBadge(transaction.status)}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-xs sm:text-sm text-gray-900 font-medium">
                  {formatDate(transaction.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-xs sm:text-sm text-gray-900 font-medium">
                  {formatAmount(transaction.amount, transaction.currency)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-xs sm:text-sm text-gray-900">
                {transaction.paymentType} Subscription
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xs text-gray-500">
                Method: {transaction.paymentMethod}
              </p>
              <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
