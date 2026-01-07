import { Button } from "@/components/ui/button";
import { useCreateMonthlyPaymentMutation } from "@/store/api/garageAdminApis/products/products";
import { toast } from "sonner";
import { openPaymentInNewTab } from "@/utils/paymentUtils";

interface PaymentMonthlyProps {
  formData: any;
}

const PaymentMonthly = ({ formData }: PaymentMonthlyProps) => {
  const [createMonthlyPayment, { isLoading: isMonthlyPaymentLoading }] =
    useCreateMonthlyPaymentMutation();
  const handlePayment = async () => {
    localStorage.setItem("productFormData", JSON.stringify(formData));
    try {
      const response = await createMonthlyPayment().unwrap();
      openPaymentInNewTab(response.url);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment session");
    }
  };
  return (
    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 mt-2">
      <p className="text-sm text-yellow-800 mb-3">
        You need to subscribe to the Product Monthly plan to add products under
        this plan.
      </p>
      <Button
        onClick={handlePayment}
        type="button"
        className="bg-yellow-600 hover:bg-yellow-700"
      >
        {isMonthlyPaymentLoading
          ? "Processing..."
          : "Subscribe to Monthly Plan"}
      </Button>
    </div>
  );
};

export default PaymentMonthly;
