import { useState, useEffect } from "react";
import { FestiveBackground } from "@/components/FestiveBackground";
import founderPhoto from "@/assets/founder.jpeg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const funnyQuotes = [
  "আমি দিনরাত code করি, বিনিময়ে শুধু একটু ঈদি চাই! 🥺",
  "এই সাইট বানাতে যত চা খেয়েছি, তার বিল কে দেবে? ☕😭",
  "আমার laptop এখন helicopter এর মতো আওয়াজ করে — repair বিল দরকার! 🚁",
  "বিরিয়ানি ছাড়া ঈদ? সেটা কি ঈদ নাকি? একটু ঈদি দিন প্লিজ! 🍛",
  "Stack Overflow ফ্রি, কিন্তু আমার সেমাই ফ্রি না! 😆",
  "এই ওয়েবসাইট বানাতে ৩ রাত ঘুম হারাম — একটু সালামি তো হক! 😴",
  "আমি AI না, আমি real মানুষ — real ঈদি দরকার! 🤖❌",
  "Bug fix করতে করতে চুল পড়ে গেছে, hair transplant এর জন্য ঈদি দিন! 👨‍🦲",
];

const amountOptions = ["৳৫০", "৳১০০", "৳২০০", "৳৫০০", "৳১০০০"];

const paymentMethods = [
  { label: "বিকাশ", number: "01881150768", emoji: "💳", color: "hsl(340, 80%, 55%)" },
  { label: "নগদ", number: "01734916497", emoji: "💰", color: "hsl(25, 90%, 55%)" },
  { label: "রকেট", number: "017349164977", emoji: "🚀", color: "hsl(270, 70%, 55%)" },
];

const Founder = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const noResponses = [
    "না, দেব না 😤",
    "সত্যিই দেব না? 🥺",
    "আরেকবার ভাবুন... 😢",
    "হৃদয় ভেঙে গেল 💔",
    "ঠিক আছে... কাঁদছি 😭",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % funnyQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.success("নম্বর কপি হয়েছে! 📋 এখন ঈদি পাঠান!");
  };

  const handleSalami = () => {
    setShowThankYou(true);
    toast.success("জাযাকাল্লাহু খাইরান! আপনার ঈদি পৌঁছে যাবে ইনশাআল্লাহ! 🤲");
  };

  const handleNo = () => {
    setNoCount((prev) => Math.min(prev + 1, noResponses.length - 1));
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        {/* Profile Header */}
        <div className="text-center animate-bounce-in mb-6">
          <div className="relative inline-block">
            <img
              src={founderPhoto}
              alt="Yeasin Arafat"
              className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-secondary shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 text-2xl">🥺</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-4">Yeasin Arafat</h2>
          <p className="text-secondary font-semibold text-sm">Founder & Developer</p>
          <p className="text-muted-foreground text-xs">EidHub</p>
        </div>

        {/* Funny Rotating Quote */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-festive animate-slide-up border border-border/50">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">🤪</span>
            <p className="text-foreground text-sm leading-relaxed font-medium transition-all duration-500">
              {funnyQuotes[quoteIndex]}
            </p>
          </div>
          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {funnyQuotes.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === quoteIndex ? "bg-secondary w-4" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-muted-foreground text-sm mb-3">কত দেবেন? বেছে নিন 👇</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {amountOptions.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                  selectedAmount === amount
                    ? "bg-secondary text-secondary-foreground border-secondary shadow-md scale-105"
                    : "bg-card/60 text-foreground border-border/50 hover:border-secondary/50 hover:scale-105"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {paymentMethods.map((pm) => (
            <div
              key={pm.label}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between border border-border/50 shadow-festive"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${pm.color}20`, color: pm.color }}
                >
                  {pm.emoji}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{pm.label} নম্বর</p>
                  <p className="text-base font-bold text-primary tracking-wide">{pm.number}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl font-semibold border-secondary/50 hover:bg-secondary hover:text-secondary-foreground transition-all"
                onClick={() => copyNumber(pm.number)}
              >
                📋 কপি
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button
            variant="festive"
            size="lg"
            className="w-full rounded-2xl text-lg py-7 shadow-lg hover:shadow-xl transition-all"
            onClick={handleSalami}
          >
            💛 Founder কে ঈদি দিন! 👐
          </Button>
        </div>

        {/* Fun Bottom Section */}
        <div className="mt-6 grid grid-cols-5 gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="col-span-3 bg-card/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
            <p className="text-secondary text-xs font-bold mb-2">ঈদি দিলে পাবেন 🎁</p>
            <div className="space-y-1.5">
              <p className="text-xs text-foreground flex items-center gap-1.5">
                <span className="text-primary">✅</span> অসীম দোয়া
              </p>
              <p className="text-xs text-foreground flex items-center gap-1.5">
                <span className="text-primary">✅</span> ভালোবাসা
              </p>
              <p className="text-xs text-foreground flex items-center gap-1.5">
                <span className="text-primary">✅</span> জান্নাতে VIP সিট*
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">*জান্নাতের guarantee নেই 😅</p>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <button
              onClick={handleNo}
              className="bg-card/40 backdrop-blur-sm rounded-2xl p-4 border border-border/50 text-center w-full h-full flex flex-col items-center justify-center hover:bg-destructive/10 transition-all"
            >
              <span className="text-2xl mb-1">😤</span>
              <p className="text-xs text-muted-foreground font-medium">
                {noResponses[noCount]}
              </p>
            </button>
          </div>
        </div>

        {/* Thank You Message */}
        {showThankYou && (
          <div className="mt-6 bg-primary/10 border border-primary/30 rounded-2xl p-5 text-center animate-bounce-in">
            <div className="text-4xl mb-2">🤲</div>
            <p className="text-primary font-bold text-lg">জাযাকাল্লাহু খাইরান!</p>
            <p className="text-muted-foreground text-sm mt-1">
              আপনার ঈদি ফাউন্ডারের কাছে পৌঁছে যাবে ইনশাআল্লাহ 🌙
            </p>
          </div>
        )}

        {/* Facebook Link */}
        <div className="mt-6 text-center animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="https://www.facebook.com/helloYeasin007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            📘 Facebook-এ নক দিন →
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-px w-10 bg-primary/30" />
            <span className="text-secondary text-sm">🌙</span>
            <span className="h-px w-10 bg-primary/30" />
          </div>
          <p className="text-sm text-muted-foreground">
            Made with Eid spirit, laughter & a little bit of code <span className="text-secondary">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;