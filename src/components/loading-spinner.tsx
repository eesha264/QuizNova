// Lightweight loading indicator for async quiz actions.
export function LoadingSpinner() {
  return (
    <div
      aria-label="Loading"
      role="status"
      className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"
    />
  );
}