import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logos/isg-logo.png"
      alt="ISG Real Estate Prague - English Speaking Property Experts for Expats"
      width={80}
      height={40}
      className={className}
      priority
    />
  );
}