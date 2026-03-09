import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EidCountdown } from "@/components/EidCountdown";
import { FestiveBackground } from "@/components/FestiveBackground";
import { Footer } from "@/components/Footer";

const features = [
  { emoji: "🎁", title: "ঈদি লিংক তৈরি করুন", desc: "নিজের ঈদি পেজ বানান ও শেয়ার করুন", path: "/create" },
  { emoji: "🎡", title: "ঈদি চরকা ঘোরান", desc: "ভাগ্য পরীক্ষা করুন মজার চরকায়!", path: "/spin" },
  { emoji: "😆", title: "ফ্রেন্ড রোস্ট", desc: "বন্ধুদের জন্য মজার ঈদ মেসেজ", path: "/roast" },
  { emoji: "🤫", title: "সিক্রেট মেসেজ", desc: "গোপন ঈদ মেসেজ পাঠান!", path: "/secret" },
  { emoji: "🖼️", title: "ঈদ DP জেনারেটর", desc: "ঈদ থিম দিয়ে DP বানান!", path: "/dp" },
  { emoji: "🎤", title: "ভয়েস ঈদ উইশ", desc: "কণ্ঠে ঈদ শুভেচ্ছা পাঠান!", path: "/voice" },
  { emoji: "🏆", title: "লিডারবোর্ড", desc: "কার ঈদি পেজ সবচেয়ে জনপ্রিয়?", path: "/leaderboard" },
];

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-bounce-in">
          <div className="text-6xl md:text-8xl mb-4">🌙</div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-3">ঈদ মোবারক!</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-6">
            নিজের ঈদি লিংক তৈরি করুন, বন্ধুদের সাথে শেয়ার করুন, আর ঈদের মজা নিন! 🎉
          </p>
          <Link to="/create">
            <Button variant="festive" size="lg" className="text-lg px-8 py-6 rounded-full">
              🎁 আমার ঈদি লিংক তৈরি করি
            </Button>
          </Link>
        </div>

        <div className="mb-12">
          <EidCountdown />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {features.map((f, i) => (
            <Link
              key={f.path}
              to={f.path}
              className="block bg-card rounded-2xl p-6 shadow-festive hover:scale-105 transition-transform duration-200 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{f.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
