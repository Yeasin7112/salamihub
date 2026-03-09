import { FestiveBackground } from "@/components/FestiveBackground";
import founderPhoto from "@/assets/founder.jpeg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const paymentMethods = [
  { label: "বিকাশ", number: "01881150768", icon: "💳" },
  { label: "নগদ", number: "01734916497", icon: "💰" },
  { label: "রকেট", number: "017349164977", icon: "🚀" },
];

const Founder = () => {
  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.success("নম্বর কপি হয়েছে! 📋");
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-10 max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="text-3xl font-bold text-primary tracking-tight">ফাউন্ডার</h1>
          <div className="w-12 h-0.5 bg-secondary mx-auto mt-2 rounded-full" />
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-festive animate-slide-up">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

          <div className="p-8 text-center">
            <img
              src={founderPhoto}
              alt="Yeasin Arafat"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-5 border-4 border-secondary/50 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Yeasin Arafat</h2>
            <p className="text-muted-foreground text-sm mt-1 mb-5">Creator of EidHub</p>

            <a
              href="https://www.facebook.com/helloYeasin007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              📘 Facebook Profile →
            </a>
          </div>

          {/* Divider */}
          <div className="px-8">
            <div className="h-px bg-border" />
          </div>

          {/* Support Section */}
          <div className="p-8">
            <p className="text-center text-sm text-muted-foreground mb-6 leading-relaxed">
              EidHub ভালো লেগে থাকলে, ফাউন্ডারকে একটি ছোট্ট ঈদি দিয়ে উৎসাহ দিতে পারেন 🌙
            </p>

            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.label}
                  className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{pm.icon}</span>
                    <div>
                      <p className="text-xs text-muted-foreground">{pm.label}</p>
                      <p className="text-base font-semibold text-foreground tracking-wide">{pm.number}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs opacity-60 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyNumber(pm.number)}
                  >
                    📋 কপি
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
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