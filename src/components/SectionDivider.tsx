type DividerVariant = "wave" | "curve" | "blob";

interface SectionDividerProps {
  variant?: DividerVariant;
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
}: SectionDividerProps) {
  const wavePath =
    "M0,64 C320,128 640,0 960,64 C1280,128 1600,0 1920,64 L1920,256 L0,256 Z";
  const curvePath =
    "M0,128 Q480,0 960,128 T1920,128 L1920,256 L0,256 Z";
  const blobPath =
    "M0,96 C240,48 480,144 720,96 C960,48 1200,144 1440,96 C1680,48 1920,144 1920,96 L1920,256 L0,256 Z";

  const paths: Record<DividerVariant, string> = {
    wave: wavePath,
    curve: curvePath,
    blob: blobPath,
  };

  return (
    <div
      className={`w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1920 256"
        className="h-12 w-full md:h-16"
        preserveAspectRatio="none"
      >
        <path
          d={paths[variant]}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
