interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  online?: boolean;
  seed?: number;
}

const GRADIENTS = [
  "linear-gradient(135deg, #7c3aed, #4f46e5)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #ec4899, #be185d)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
];

const SIZES = {
  sm: { box: 36, text: "text-xs", dot: 8 },
  md: { box: 44, text: "text-sm", dot: 10 },
  lg: { box: 56, text: "text-base", dot: 12 },
  xl: { box: 80, text: "text-xl", dot: 14 },
};

export default function Avatar({ initials, size = "md", online, seed = 0 }: AvatarProps) {
  const { box, text, dot } = SIZES[size];
  const gradient = GRADIENTS[seed % GRADIENTS.length];

  return (
    <div className="relative inline-flex flex-shrink-0" style={{ width: box, height: box }}>
      <div
        className={`w-full h-full rounded-2xl flex items-center justify-center font-bold text-white ${text}`}
        style={{ background: gradient }}
      >
        {initials}
      </div>
      {online && (
        <>
          <div
            className="absolute rounded-full border-2 z-10"
            style={{
              width: dot, height: dot,
              bottom: -1, right: -1,
              background: "#22c55e",
              borderColor: "#0d0d1a"
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: dot, height: dot,
              bottom: -1, right: -1,
              background: "#22c55e",
              animation: "pulse-ring 1.8s ease-out infinite"
            }}
          />
        </>
      )}
    </div>
  );
}
