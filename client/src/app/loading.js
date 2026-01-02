export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      <span className="text-3xl font-semibold text-purple-400">
        Loading
      </span>
    </div>
  );
}
