export function Logo({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center`}>
      <svg
        width="200"
        height="60"
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
      >
        <text
          x="10"
          y="25"
          fontSize="20"
          fontWeight="bold"
          fill="currentColor"
          className="font-serif"
        >
          ISG
        </text>
        <text
          x="10"
          y="40"
          fontSize="10"
          fontWeight="normal"
          fill="currentColor"
          className="font-sans"
        >
          Investment Solutions Group
        </text>
      </svg>
    </div>
  );
}