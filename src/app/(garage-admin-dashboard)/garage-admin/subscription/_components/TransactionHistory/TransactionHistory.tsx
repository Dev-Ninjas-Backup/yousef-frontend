import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-4 bg-white p-4 sm:p-6 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-900">Transaction History</h3>
          <p className="text-sm text-gray-500">View all your billing transactions</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full overfolow-x-auto">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Transaction ID</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Date</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Description</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Payment Method</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Amount (AED)</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Status</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y bg-white">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.id}</td>
                      <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.date}</td>
                      <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.description}</td>
                      <td className="px-3 sm:px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{transaction.method}</td>
                      <td className="px-3 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{transaction.amount}</td>
                      <td className="px-3 sm:px-4 py-3">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1 whitespace-nowrap">
                          <CheckCircle className="w-3 h-3" />
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <Button variant="ghost" size="sm" className="whitespace-nowrap">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
