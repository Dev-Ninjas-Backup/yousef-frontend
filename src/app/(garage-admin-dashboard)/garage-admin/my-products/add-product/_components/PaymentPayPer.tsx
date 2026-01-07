import { Button } from "@/components/ui/button";
import { useCreatePayPerPaymentMutation } from "@/store/api/garageAdminApis/products/products";
import { toast } from "sonner";
import { openPaymentInNewTab } from "@/utils/paymentUtils";

interface PaymentPayPerProps {
  formData: any;
}

const PaymentPayPer = ({ formData }: PaymentPayPerProps) => {
  const [createPayPerPayment, { isLoading: isPayPerPaymentLoading }] =
    useCreatePayPerPaymentMutation();
  const handlePayment = async () => {
    localStorage.setItem("productFormData", JSON.stringify(formData));
    try {
      const response = await createPayPerPayment().unwrap();
      openPaymentInNewTab(response.url);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment session");
    }
  };
  return (
    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 mt-2">
      <p className="text-sm text-yellow-800 mb-3">
        You need to subscribe to the Product Pay per plan to add products under
        this plan.
      </p>
      <Button
        onClick={handlePayment}
        type="button"
        className="bg-yellow-600 hover:bg-yellow-700"
      >
        {isPayPerPaymentLoading ? "Processing..." : "Subscribe to Pay per Plan"}
      </Button>
    </div>
  );
};

export default PaymentPayPer;
