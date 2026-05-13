export default function LoadingSpinner() {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header skeleton */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-8 py-8 flex items-center gap-5 border-b border-gray-100">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-2.5 flex-1">
            <div className="h-4 w-40 rounded-full bg-gray-200" />
            <div className="h-3 w-56 rounded-full bg-gray-200" />
            <div className="h-3 w-32 rounded-full bg-gray-200" />
          </div>
          <div className="hidden sm:flex gap-2 ml-auto">
            <div className="h-9 w-24 rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Body skeleton */}
        <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-3 w-20 rounded-full bg-gray-200" />
              <div className="h-10 w-full rounded-lg bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="px-8 py-4 border-t border-gray-100 flex justify-end">
          <div className="h-9 w-28 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}