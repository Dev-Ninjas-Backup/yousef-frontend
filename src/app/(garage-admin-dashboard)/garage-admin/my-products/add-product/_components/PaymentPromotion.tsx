interface PaymentPromotionProps {
  formData: any;
  duration: string;
  availableCredits: number;
  deduction: number;
  remainingCost: number;
  price: number;
}

const PaymentPromotion = ({
  duration,
  availableCredits,
  deduction,
  remainingCost,
  price,
}: PaymentPromotionProps) => {
  if (deduction > 0) {
    if (remainingCost > 0) {
      return (
        <div className="border border-indigo-200 rounded-lg p-4 bg-indigo-50/50">
          <p className="text-xs text-indigo-800 font-medium leading-relaxed">
            You have <strong className="font-bold">{availableCredits} AED</strong> in credits. 
            We will deduct <strong className="font-bold">-{deduction} AED</strong> and you will be charged the remaining <strong className="font-bold text-indigo-600">{remainingCost} AED</strong> directly for the promotion.
          </p>
        </div>
      );
    } else {
      return (
        <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50/50">
          <p className="text-xs text-emerald-800 font-medium leading-relaxed">
            We will deduct <strong className="font-bold">-{deduction} AED</strong> from your available credits balance (<strong className="font-bold">{availableCredits} AED</strong>). 
            No card payment is required!
          </p>
        </div>
      );
    }
  } else if (availableCredits > 0) {
    return (
      <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
        <p className="text-xs text-yellow-800 font-medium leading-relaxed">
          You chose not to use your promotion credits. You will be charged <strong className="font-bold">{price} AED</strong> directly for the promotion.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-yellow-250 rounded-lg p-4 bg-yellow-50/50">
      <p className="text-xs text-yellow-800/80 font-medium leading-relaxed">
        You don't have promotion credits. You will be charged <strong className="font-bold">{price} AED</strong> directly for the promotion.
      </p>
    </div>
  );
};

export default PaymentPromotion;
