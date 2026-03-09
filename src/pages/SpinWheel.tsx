import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FestiveBackground } from "@/components/FestiveBackground";

const segments = [
  { label: "১০ টাকা 💸", color: "hsl(152, 70%, 28%)" },
  { label: "৫০ টাকা 💰", color: "hsl(43, 85%, 55%)" },
  { label: "আজ নাই 😆", color: "hsl(0, 70%, 55%)" },
  { label: "১০০ টাকা 🤑", color: "hsl(152, 50%, 45%)" },
  { label: "ডাবল ঈদি! 🎉", color: "hsl(43, 90%, 45%)" },
  { label: "আবার চেষ্টা 🔄", color: "hsl(230, 35%, 30%)" },
];

const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const segIndex = Math.floor(Math.random() * segments.length);
    const segAngle = 360 / segments.length;
    const extra = 360 * 5 + (360 - segIndex * segAngle - segAngle / 2);
    const newRotation = rotation + extra;
    setRotation(newRotation);

    setTimeout(() => {
      setResult(segments[segIndex].label);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        <div className="animate-bounce-in mb-8">
          <div className="text-5xl mb-3">🎡</div>
          <h1 className="text-3xl font-bold text-primary">ঈদি চরকা</h1>
          <p className="text-muted-foreground mt-2">ঘুরান আর দেখুন কত ঈদি পান! 🎉</p>
        </div>

        {/* Wheel */}
        <div className="relative mx-auto w-72 h-72 mb-8">
          {/* Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-3xl">▼</div>

          <div
            className="w-full h-full rounded-full border-4 border-secondary overflow-hidden shadow-festive"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {segments.map((seg, i) => {
                const angle = 360 / segments.length;
                const startAngle = i * angle - 90;
                const endAngle = startAngle + angle;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const largeArc = angle > 180 ? 1 : 0;
                const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                const textX = 100 + 60 * Math.cos(midAngle);
                const textY = 100 + 60 * Math.sin(midAngle);
                const textRotate = (startAngle + endAngle) / 2;

                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={seg.color}
                      stroke="hsl(45, 40%, 95%)"
                      strokeWidth="1"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotate}, ${textX}, ${textY})`}
                    >
                      {seg.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <Button variant="festive" size="lg" className="rounded-full text-lg px-10" onClick={spin} disabled={spinning}>
          {spinning ? "ঘুরছে... 🌀" : "🎡 চরকা ঘোরান!"}
        </Button>

        {result && (
          <div className="mt-6 animate-bounce-in bg-card rounded-2xl p-6 shadow-festive">
            <p className="text-sm text-muted-foreground mb-2">আপনার ঈদি:</p>
            <p className="text-3xl font-bold text-primary">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
