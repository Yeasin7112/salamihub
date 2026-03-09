import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EidCountdown } from "@/components/EidCountdown";
import { FestiveBackground } from "@/components/FestiveBackground";
import { Footer } from "@/components/Footer";

const features = [
  { emoji: "🎁", title: "ঈদি লিংক তৈরি", desc: "নিজের ঈদি পেজ বানান ও শেয়ার করুন", path: "/create", color: "from-primary/20 to-primary/5" },
  { emoji: "🎡", title: "ঈদি চরকা", desc: "ভাগ্য পরীক্ষা করুন মজার চরকায়!", path: "/spin", color: "from-secondary/20 to-secondary/5" },
  { emoji: "😆", title: "ফ্রেন্ড রোস্ট", desc: "বন্ধুদের জন্য মজার ঈদ মেসেজ", path: "/roast", color: "from-destructive/20 to-destructive/5" },
  { emoji: "🤫", title: "সিক্রেট মেসেজ", desc: "গোপন ঈদ মেসেজ পাঠান!", path: "/secret", color: "from-primary/20 to-primary/5" },
  { emoji: "🖼️", title: "ঈদ DP জেনারেটর", desc: "ঈদ থিম দিয়ে DP বানান!", path: "/dp", color: "from-secondary/20 to-secondary/5" },
  { emoji: "🎤", title: "ভয়েস উইশ", desc: "কণ্ঠে ঈদ শুভেচ্ছা পাঠান!", path: "/voice", color: "from-primary/20 to-primary/5" },
  { emoji: "🏆", title: "লিডারবোর্ড", desc: "কার ঈদি পেজ সবচেয়ে জনপ্রিয়?", path: "/leaderboard", color: "from-secondary/20 to-secondary/5" },
];

const howItWorks = [
  { step: "১", emoji: "✏️", title: "নাম ও তথ্য দিন", desc: "আপনার নাম, ছবি আর বিকাশ নম্বর দিন — ব্যস!" },
  { step: "২", emoji: "🎯", title: "লিংক পান", desc: "আপনার ইউনিক ঈদি লিংক তৈরি হয়ে যাবে!" },
  { step: "৩", emoji: "🔗", title: "শেয়ার করুন", desc: "WhatsApp, Facebook-এ শেয়ার করুন এবং ঈদি পান!" },
];

const funnyChats = [
  { name: "সাকিব", initial: "স", time: "সকাল ৯:৪৬", emoji: "😋", msg: "ঈদের দিন বিরিয়ানি না খেলে ঈদ হয় না, আর বিরিয়ানির টাকা নাই 🥲" },
  { name: "তানভীর", initial: "ত", time: "সকাল ১০:৫২", emoji: "👔", msg: "পাঞ্জাবি কিনেছি, এখন রিকশা ভাড়াও নাই বাসায় যাওয়ার 🥺" },
  { name: "মেহেদী", initial: "মে", time: "দুপুর ১২:০৫", emoji: "🧠", msg: "বিজ্ঞানীরা প্রমাণ করেছেন সালামি দিলে দাতার সৌভাগ্য ৪০০% বাড়ে! গবেষণাটা আমি নিজেই করেছি 😏" },
  { name: "রাফি", initial: "র", time: "দুপুর ৪:৩০", emoji: "🤝", msg: "আপনি সালামি দেবেন, আমি দোয়া করব — এই ডিলে লাভ আপনার বেশি 💕" },
  { name: "আরিফ", initial: "আ", time: "বিকাল ৩:৪৫", emoji: "🤣", msg: "না দিলে মরে যাব। বেঁচে থাকলে আবার চাইব। তাই দিয়েই দিন 👋" },
];

const Index = () => {
  const [visibleChats, setVisibleChats] = useState(0);

  useEffect(() => {
    if (visibleChats < funnyChats.length) {
      const timer = setTimeout(() => setVisibleChats((v) => v + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [visibleChats]);

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="text-center mb-10 animate-bounce-in max-w-lg mx-auto">
          <div className="text-7xl md:text-8xl mb-3 animate-float">🌙</div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">ঈদ মোবারক! 😊</h1>
          <p className="text-base text-muted-foreground max-w-sm mx-auto mb-2">
            বন্ধু, ভাই, দুলাভাই ও <span className="text-secondary font-bold">১৪ গোষ্ঠীর</span> কাছে ঈদি চান?
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            নির্ভয়ে শুধু ঈদি চান, <span className="text-secondary font-semibold">ঈদি পাওয়ার দায়িত্ব</span> আমাদের 🤭
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/create">
              <Button variant="festive" size="lg" className="text-lg px-8 py-6 rounded-2xl w-full sm:w-auto">
                ঈদি চাইতে শুরু করুন 🚀
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-2xl border-secondary/50 text-secondary hover:bg-secondary/10 w-full sm:w-auto">
                কিভাবে কাজ করে? ▼
              </Button>
            </a>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <EidCountdown />
        </div>

        {/* How it works */}
        <div id="how-it-works" className="mb-14 max-w-3xl mx-auto scroll-mt-20">
          <h2 className="text-2xl font-bold text-secondary text-center mb-8">কিভাবে কাজ করে? ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howItWorks.map((item, i) => (
              <div
                key={i}
                className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 border border-border/50 text-center animate-slide-up relative overflow-hidden"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funny Chat Section */}
        <div className="mb-14 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-secondary text-center mb-2">সালামি চাওয়ার কারণ 🤪</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">মানুষজন কি কি কারণে ঈদি চায় দেখুন 👇</p>

          <div className="space-y-4">
            {funnyChats.slice(0, visibleChats).map((chat, i) => (
              <div key={i} className="animate-slide-up">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground">{chat.name} · {chat.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                    {chat.initial}
                  </div>
                  <div className="bg-card/70 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 border border-border/50 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="text-lg mr-1.5">{chat.emoji}</span>
                      {chat.msg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleChats >= funnyChats.length && (
            <div className="mt-4 text-center animate-slide-up">
              <button
                onClick={() => setVisibleChats(0)}
                className="text-xs text-muted-foreground hover:text-secondary transition-colors"
              >
                ↺ আবার দেখুন
              </button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-secondary text-center mb-2">আরো মজার ফিচার 🎉</h2>
          <p className="text-sm text-muted-foreground text-center mb-8">ঈদকে আরো মজাদার করতে এগুলো ট্রাই করুন!</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <Link
                key={f.path}
                to={f.path}
                className={`block bg-gradient-to-br ${f.color} bg-card/60 backdrop-blur-sm rounded-2xl p-5 border border-border/50 hover:scale-105 hover:shadow-festive transition-all duration-200 animate-slide-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl mb-2">{f.emoji}</div>
                <h3 className="text-sm font-bold text-foreground mb-0.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-lg mx-auto text-center mb-8 animate-slide-up">
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-festive">
            <div className="text-4xl mb-3">🤲</div>
            <h3 className="text-xl font-bold text-foreground mb-2">তো দেরি কেন?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              এখনই আপনার ঈদি লিংক তৈরি করুন আর বন্ধুদের পাঠিয়ে দিন! <br />
              <span className="text-secondary font-semibold">ঈদি না দিলে সম্পর্ক শেষ 😤</span>
            </p>
            <Link to="/create">
              <Button variant="festive" size="lg" className="rounded-2xl text-lg px-10">
                🎁 এখনই শুরু করুন
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;