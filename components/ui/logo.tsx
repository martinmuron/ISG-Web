import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logos/isg-logo.png"
      alt="ISG Investment Solutions Group"
      width={200}
      height={60}
      className={className}
      priority
    />
  );
}