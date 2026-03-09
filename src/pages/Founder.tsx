import { FestiveBackground } from "@/components/FestiveBackground";

const Founder = () => {
  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        <div className="animate-bounce-in">
          <div className="text-5xl mb-4">❤️</div>
          <h1 className="text-3xl font-bold text-primary mb-2">ফাউন্ডার সালামি</h1>
          <p className="text-muted-foreground mb-8">
            এই মজার ঈদ ওয়েবসাইট ভালো লাগলে ফাউন্ডারকে একটু সালামি দিতে পারেন! 😊
          </p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-festive animate-slide-up">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-4xl text-primary-foreground border-4 border-secondary shadow-gold">
            🌙
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">EidiLink ফাউন্ডার</h2>
          <p className="text-muted-foreground text-sm mb-6">ঈদের আনন্দ সবার মাঝে ছড়িয়ে দিতে চাই</p>

          <div className="bg-muted rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">💳 বিকাশ নম্বর</p>
            <p className="text-xl font-bold text-primary">01XXXXXXXXX</p>
          </div>

          <div className="bg-muted rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">💰 নগদ নম্বর</p>
            <p className="text-xl font-bold text-primary">01XXXXXXXXX</p>
          </div>

          <p className="text-muted-foreground text-sm">
            আপনার সালামি এই প্রজেক্ট চালিয়ে যেতে সাহায্য করবে। ধন্যবাদ! 🙏
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          ঈদ মোবারক! 🌙 সবার জন্য শুভকামনা ❤️
        </p>
      </div>
    </div>
  );
};

export default Founder;
