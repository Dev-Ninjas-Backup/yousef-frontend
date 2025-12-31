interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message = "Failed to load profile" }: ErrorMessageProps) {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="text-red-600">{message}</div>
    </div>
  );
}