export function IslamicPattern({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="islamic-geo"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Eight-pointed star */}
            <polygon
              points="40,5 47,28 70,20 55,38 75,50 52,50 55,75 40,60 25,75 28,50 5,50 25,38 10,20 33,28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            {/* Inner square */}
            <rect
              x="28"
              y="28"
              width="24"
              height="24"
              transform="rotate(45,40,40)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {/* Corner dots */}
            <circle cx="0" cy="0" r="1.5" fill="currentColor" />
            <circle cx="80" cy="0" r="1.5" fill="currentColor" />
            <circle cx="0" cy="80" r="1.5" fill="currentColor" />
            <circle cx="80" cy="80" r="1.5" fill="currentColor" />
            <circle cx="40" cy="40" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geo)" />
      </svg>
    </div>
  );
}

export function IslamicBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 text-gold-400">
        <path
          d="M0,20 Q20,5 40,20 Q60,35 80,20 Q100,5 120,20 Q140,35 160,20 Q180,5 200,20 Q220,35 240,20 Q260,5 280,20 Q300,35 320,20 Q340,5 360,20 Q380,35 400,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {[40, 120, 200, 280, 360].map((x) => (
          <g key={x}>
            <circle cx={x} cy="20" r="3" fill="currentColor" />
            <circle cx={x} cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </g>
        ))}
      </svg>
    </div>
  );
}
