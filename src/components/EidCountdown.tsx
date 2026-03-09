import { useEffect, useState } from "react";

// Eid al-Fitr 2026 approximate date (adjust as needed)
const EID_DATE = new Date("2026-03-20T06:00:00+06:00");

export const EidCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = EID_DATE.getTime() - now.getTime();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center animate-bounce-in">
        <p className="text-3xl font-bold text-gold">🎉 ঈদ মোবারক! 🎉</p>
      </div>
    );
  }

  const units = [
    { label: "দিন", value: timeLeft.days },
    { label: "ঘন্টা", value: timeLeft.hours },
    { label: "মিনিট", value: timeLeft.minutes },
    { label: "সেকেন্ড", value: timeLeft.seconds },
  ];

  return (
    <div className="text-center">
      <p className="text-lg font-medium text-muted-foreground mb-3">⏳ ঈদ আসছে</p>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div key={u.label} className="bg-primary text-primary-foreground rounded-xl px-4 py-3 min-w-[70px] shadow-festive">
            <div className="text-2xl font-bold">{u.value}</div>
            <div className="text-xs opacity-80">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
