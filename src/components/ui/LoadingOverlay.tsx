export function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-900 text-lg">{message}</p>
      </div>
    </div>
  );
} 