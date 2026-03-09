import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FestiveBackground } from "@/components/FestiveBackground";
import { toast } from "sonner";

const roasts = [
  (n: string) => `ঈদ মোবারক ${n}! সালামি না দিলে ফ্রেন্ডশিপ ক্যান্সেল 😆`,
  (n: string) => `${n}, তোর ঈদি আমি আগেই কেটে নিছি। ঈদ মোবারক! 🤣`,
  (n: string) => `ঈদ মোবারক ${n}! তোর সেমাই খাওয়ার স্পিড দেখে রকেট লজ্জা পায় 🚀😂`,
  (n: string) => `${n}, এবার ঈদে তোকে না দেখলে ঈদই ভালো হতো 😆 জাস্ট কিডিং, ঈদ মোবারক!`,
  (n: string) => `ঈদ মোবারক ${n}! তুই ঈদি দিবি না জানি, তাই আগেই বলে দিলাম - ফ্রি তে চলবে না 💸😂`,
  (n: string) => `${n} ভাই, ঈদের দিন তোর চেহারা দেখলে চাঁদ লুকিয়ে যায় 🌙😆`,
  (n: string) => `${n}, তোর ঈদের জামা দেখে মনে হচ্ছে সেকেন্ড হ্যান্ড ঈদ 😂 ঈদ মোবারক!`,
  (n: string) => `ঈদ মোবারক ${n}! তুই ছাড়া ঈদ পার্টি কমপ্লিট... আসলে তুই থাকলেও কমপ্লিট 😆`,
  (n: string) => `${n}, এত সেমাই খাস কেন? ঈদ না, সেমাই উৎসব! 🍜😂`,
  (n: string) => `ঈদ মোবারক ${n}! তোকে ঈদি দিতে গেলে আমার পকেট কাঁদে 😭💸`,
];

const RoastGenerator = () => {
  const [friendName, setFriendName] = useState("");
  const [roast, setRoast] = useState<string | null>(null);

  const generate = () => {
    if (!friendName.trim()) {
      toast.error("বন্ধুর নাম দিন!");
      return;
    }
    const random = roasts[Math.floor(Math.random() * roasts.length)];
    setRoast(random(friendName.trim()));
  };

  const copy = () => {
    if (roast) {
      navigator.clipboard.writeText(roast);
      toast.success("কপি হয়েছে! 📋");
    }
  };

  const shareWhatsApp = () => {
    if (roast) {
      window.open(`https://wa.me/?text=${encodeURIComponent(roast)}`, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        <div className="animate-bounce-in mb-8">
          <div className="text-5xl mb-3">😆</div>
          <h1 className="text-3xl font-bold text-primary">ফ্রেন্ড রোস্ট জেনারেটর</h1>
          <p className="text-muted-foreground mt-2">বন্ধুর নাম দিন, মজার ঈদ মেসেজ পান!</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-festive space-y-4 animate-slide-up">
          <Input
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            placeholder="বন্ধুর নাম লিখুন..."
            className="rounded-xl text-center text-lg"
          />
          <Button variant="festive" size="lg" className="w-full rounded-full" onClick={generate}>
            😆 রোস্ট জেনারেট করুন
          </Button>
        </div>

        {roast && (
          <div className="mt-6 animate-bounce-in bg-card rounded-2xl p-6 shadow-festive">
            <p className="text-lg font-medium text-foreground mb-4 leading-relaxed">{roast}</p>
            <div className="flex justify-center gap-3">
              <Button variant="gold" size="sm" className="rounded-full" onClick={copy}>📋 কপি</Button>
              <Button variant="gold" size="sm" className="rounded-full" onClick={shareWhatsApp}>💬 WhatsApp</Button>
              <Button variant="outline" size="sm" className="rounded-full" onClick={generate}>🔄 আরেকটা</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoastGenerator;
