import { MessageSquare } from "lucide-react";

export function EmptyInquiriesState() {
  return (
    <div className="bg-white rounded-lg border p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Inquiries Yet</h3>
        <p className="text-sm text-gray-600">
          Customer inquiries about your products will appear here
        </p>
      </div>
    </div>
  );
}
