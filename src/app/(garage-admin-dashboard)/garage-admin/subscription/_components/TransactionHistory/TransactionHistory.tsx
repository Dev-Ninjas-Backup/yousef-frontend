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
    <div className="bg-white p-4 sm:p-6 rounded-xl border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Transaction History</h3>
          <p className="text-sm text-gray-500">View all your billing transactions</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto w-[330px] md:w-[600px] lg:w-full">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Payment Method</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Amount (AED)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{transaction.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.date}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.description}</td>
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{transaction.method}</td>
                <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.amount}</td>
                <td className="px-4 py-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" />
                    {transaction.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
