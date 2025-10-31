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
    <div className="space-y-4 bg-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Transaction History</h3>
          <p className="text-sm text-gray-500">View all your billing transactions</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Payment Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Amount (AED)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{transaction.method}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{transaction.amount}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
