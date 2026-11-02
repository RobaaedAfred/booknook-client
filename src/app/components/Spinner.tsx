export default function Spinner({ className = "min-h-[60vh]" }: { className?: string }) {
  return (
    <div className={`flex w-full items-center justify-center ${className}`} role="status" aria-label="Loading">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}
