import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle } from "lucide-react";

const transactions = [
  {
    id: "TXN001",
    date: "Oct 1, 2025",
    description: "3-Month Free Trial Started",
    method: "-",
    amount: "Free",
    status: "Paid",
  },
  {
    id: "TXN002",
    date: "Sep 28, 2025",
    description: "Platform Registration Fee",
    method: "-",
    amount: "Free",
    status: "Paid",
  },
];

const TransactionHistory = () => {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl border w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">Transaction History</h3>
          <p className="text-xs sm:text-sm text-gray-500">View all your billing transactions</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">ID</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Date</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Description</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Method</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Amount</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">{transaction.id}</td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{transaction.date}</td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{transaction.description}</td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">{transaction.method}</td>
                <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap">{transaction.amount}</td>
                <td className="px-3 sm:px-4 py-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 text-xs whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" />
                    {transaction.status}
                  </Badge>
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <Button variant="ghost" size="sm" className="text-xs h-8">View</Button>
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
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">ID</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Date</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Description</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Amount</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-900">{transaction.id}</td>
                <td className="px-3 py-2 text-gray-900">{transaction.date}</td>
                <td className="px-3 py-2 text-gray-900 truncate">{transaction.description}</td>
                <td className="px-3 py-2 text-gray-900">{transaction.amount}</td>
                <td className="px-3 py-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Paid
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2 sm:space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border rounded-lg p-3 space-y-2">
            <div className="flex items-start justify-between gap-2 pb-2 border-b">
              <div>
                <p className="text-xs text-gray-500">ID</p>
                <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 text-xs whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Paid
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-xs sm:text-sm text-gray-900 font-medium">{transaction.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-xs sm:text-sm text-gray-900 font-medium">{transaction.amount}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-xs sm:text-sm text-gray-900">{transaction.description}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xs text-gray-500">Method: {transaction.method}</p>
              <Button variant="ghost" size="sm" className="text-xs h-8 px-2">View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
