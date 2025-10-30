import { StarIcon } from "lucide-react";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-[#3397FF] text-[#3397FF]'
              : star - 0.5 === rating
              ? 'fill-[#FFD700] text-[#FFD700] opacity-50'
              : 'fill-gray-300 text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
export default Rating;