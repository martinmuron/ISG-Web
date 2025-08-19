export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="10"
        y="30"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
        className="font-serif"
      >
        REALITY
      </text>
      <text
        x="140"
        y="30"
        fontSize="32"
        fontWeight="bold"
        fill="currentColor"
        className="font-serif"
      >
        JJ
      </text>
      <circle
        cx="130"
        cy="25"
        r="3"
        fill="currentColor"
        className="opacity-70"
      />
    </svg>
  );
}