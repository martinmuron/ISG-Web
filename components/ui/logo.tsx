import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logos/isg-logo.svg"
      alt="ISG Investment Solutions Group"
      width={80}
      height={40}
      className={className}
      priority
    />
  );
}