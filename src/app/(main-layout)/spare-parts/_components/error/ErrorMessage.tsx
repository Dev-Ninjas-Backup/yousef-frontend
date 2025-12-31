interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ 
  message = "Failed to load products. Please try again." 
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="text-red-600 text-lg font-medium mb-2">
          Oops! Something went wrong
        </div>
        <div className="text-gray-600">{message}</div>
      </div>
    </div>
  );
}