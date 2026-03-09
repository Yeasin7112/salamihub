import { useEffect, useState } from "react";

const Star = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute text-star animate-twinkle" style={style}>✦</div>
);

const Lantern = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute animate-lantern text-2xl md:text-3xl" style={style}>🏮</div>
);

export const FestiveBackground = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const [stars] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      fontSize: `${8 + Math.random() * 12}px`,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {variant === "dark" && <div className="absolute inset-0 bg-night-gradient" />}
      {stars.map((style, i) => (
        <Star key={i} style={style} />
      ))}
      <Lantern style={{ top: "5%", left: "5%", animationDelay: "0s" }} />
      <Lantern style={{ top: "8%", right: "8%", animationDelay: "1.5s" }} />
      {/* Crescent moon */}
      <div className="absolute top-4 right-12 text-4xl md:text-5xl animate-float opacity-80">🌙</div>
    </div>
  );
};
