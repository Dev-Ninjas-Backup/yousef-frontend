import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  DollarSign,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

interface ViewTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: any;
}

const ViewTransactionModal = ({
  open,
  onOpenChange,
  transaction,
}: ViewTransactionModalProps) => {
  if (!transaction) return null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
            <CheckCircle className="w-4 h-4" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 gap-1">
            <Clock className="w-4 h-4" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 gap-1">
            <XCircle className="w-4 h-4" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();
    const COLORS = { primary: [30, 64, 175] as const, white: [255, 255, 255] as const, black: [0, 0, 0] as const, gray: [243, 244, 246] as const };
    const currency = transaction.currency.toUpperCase();
    const amount = transaction.amount.toFixed(2);
    
    doc.setFillColor(...COLORS.primary);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(...COLORS.white);
    doc.setFontSize(24);
    doc.text("Sayara Hub", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Payment Invoice", 105, 30, { align: "center" });

    doc.setTextColor(...COLORS.black);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE TO:", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(transaction.user?.fullName || "N/A", 20, 62);
    doc.text(transaction.user?.email || "N/A", 20, 68);
    doc.text(transaction.user?.phone || "N/A", 20, 74);

    doc.setFont("helvetica", "bold");
    doc.text("INVOICE DETAILS:", 130, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${transaction.transactionId}`, 130, 62);
    doc.text(`Date: ${new Date(transaction.createdAt).toLocaleDateString()}`, 130, 68);
    doc.text(`Status: ${transaction.status.toUpperCase()}`, 130, 74);

    doc.setFillColor(...COLORS.gray);
    doc.rect(20, 90, 170, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", 25, 96);
    doc.text("Payment Method", 90, 96);
    doc.text("Amount", 170, 96, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.text(`${transaction.paymentType} Subscription`, 25, 106);
    doc.text(transaction.paymentMethod, 90, 106);
    doc.text(`${currency} ${amount}`, 170, 106, { align: "right" });
    doc.line(20, 110, 190, 110);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", 120, 125);
    doc.setFontSize(16);
    doc.setTextColor(...COLORS.primary);
    doc.text(`${currency} ${amount}`, 190, 125, { align: "right" });

    doc.setTextColor(...COLORS.black);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Session ID: ${transaction.sessionId}`, 20, 145);

    doc.setFillColor(249, 250, 251);
    doc.rect(0, 260, 210, 37, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Sayara Hub", 105, 270, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Thank you for your business!", 105, 277, { align: "center" });
    doc.text("For any questions, please contact support@sayarahub.com", 105, 284, { align: "center" });

    doc.save(`invoice_${transaction.transactionId}.pdf`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-10">
            <DialogTitle className="text-base sm:text-lg">
              Transaction Details
            </DialogTitle>
            <Button
              size="sm"
              onClick={downloadInvoice}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Invoice</span>
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Transaction Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600">
                  Transaction ID
                </p>
                <p className="text-sm sm:text-lg font-semibold truncate">
                  {transaction.transactionId}
                </p>
              </div>
              {getStatusBadge(transaction.status)}
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Amount</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">
                    {transaction.currency.toUpperCase()}{" "}
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Payment Method
                </p>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <p className="text-sm sm:text-lg font-semibold">
                    {transaction.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Description
              </p>
              <p className="text-sm sm:text-base font-medium">
                {transaction.paymentType} Subscription
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Date & Time
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-xs sm:text-sm">
                  {formatDate(transaction.createdAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Session ID
              </p>
              <p className="text-xs sm:text-sm font-mono bg-gray-50 p-2 rounded border break-all">
                {transaction.sessionId}
              </p>
            </div>
          </div>

          {/* User Info */}
          {transaction.user && (
            <>
              <Separator />
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  User Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">Name</p>
                      <p className="text-sm sm:text-base font-medium break-words">
                        {transaction.user.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">Email</p>
                      <p className="text-sm sm:text-base font-medium break-all">
                        {transaction.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                      <p className="text-sm sm:text-base font-medium">
                        {transaction.user.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransactionModal;
