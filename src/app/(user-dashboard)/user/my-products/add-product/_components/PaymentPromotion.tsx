interface PaymentPromotionProps {
  formData: any;
  duration: string;
}

const PaymentPromotion = ({ formData, duration }: PaymentPromotionProps) => {
  return (
    <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
      <p className="text-sm text-yellow-800 font-medium">
        You don't have promotion credits. You will be charged directly for the promotion upon publishing this product.
      </p>
    </div>
  );
};

export default PaymentPromotion;
