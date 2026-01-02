import { Button } from "@/components/ui/button";
import { useCreatePromotionPaymentMutation } from "@/store/api/garageAdminApis/products/products";
import { toast } from "sonner";

interface PaymentPromotionProps {
  formData: any;
}

const PaymentPromotion = ({ formData }: PaymentPromotionProps) => {
  const [createPromotionPayment, { isLoading: isPaymentLoading }] =
    useCreatePromotionPaymentMutation();

  const handlePayment = async () => {
    localStorage.setItem("productFormData", JSON.stringify(formData));

    try {
      const response = await createPromotionPayment().unwrap();
      window.location.href = response.url;
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create payment session");
    }
  };
  return (
    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
      <p className="text-sm text-yellow-800 mb-3">
        You don't have promotion credits. Please buy credits to promote your
        product.
      </p>
      <Button
        type="button"
        onClick={handlePayment}
        disabled={isPaymentLoading}
        className="bg-yellow-600 hover:bg-yellow-700"
      >
        {isPaymentLoading ? "Processing..." : "Buy Promotion Credit"}
      </Button>
    </div>
  );
};

export default PaymentPromotion;
