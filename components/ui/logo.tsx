export function Logo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className="text-2xl font-bold text-brand-600">
        ISG
      </div>
    </div>
  );
}