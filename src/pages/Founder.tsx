import { FestiveBackground } from "@/components/FestiveBackground";
import founderPhoto from "@/assets/founder.jpeg";

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
          <img src={founderPhoto} alt="Yeasin Arafat" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-secondary shadow-gold" />
          <h2 className="text-2xl font-bold text-foreground mb-1">Yeasin Arafat</h2>
          <p className="text-muted-foreground text-sm mb-4">ঈদের আনন্দ সবার মাঝে ছড়িয়ে দিতে চাই</p>

          <a
            href="https://www.facebook.com/helloYeasin007"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          >
            📘 Facebook Profile
          </a>

          <div className="bg-muted rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">💳 বিকাশ নম্বর</p>
            <p className="text-xl font-bold text-primary">01881150768</p>
          </div>

          <div className="bg-muted rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">💰 নগদ নম্বর</p>
            <p className="text-xl font-bold text-primary">01734916497</p>
          </div>

          <div className="bg-muted rounded-xl p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">🚀 রকেট নম্বর</p>
            <p className="text-xl font-bold text-primary">017349164977</p>
          </div>

          <p className="text-muted-foreground text-sm">
            This little project was built with Eid spirit and a lot of coffee ☕
            <br />
            If you enjoyed it, feel free to send the founder a little Eidi 🎁
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
