import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile, incrementVisit, type EidiProfile } from "@/lib/eidiStore";
import { FestiveBackground } from "@/components/FestiveBackground";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EidiPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<EidiProfile | null>(null);
  const [showFirework, setShowFirework] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const p = await getProfile(id);
        if (p) {
          setProfile(p);
          await incrementVisit(id);
        }
      }
      setLoading(false);
    };
    load();
    const timer = setTimeout(() => setShowFirework(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  const shareUrl = window.location.href;

  const share = (platform: string) => {
    const text = `${profile?.name} আপনাকে ঈদ মোবারক জানাচ্ছে! 🌙🎉`;
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=0`,
    };
    window.open(urls[platform], "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("লিংক কপি হয়েছে! 📋");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <div className="text-6xl mb-4 animate-float">🌙</div>
          <p className="text-xl text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-muted-foreground">ঈদি পেজ খুঁজে পাওয়া যায়নি!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FestiveBackground variant="dark" />

      {showFirework && (
        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-8xl animate-firework">🎆</div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center animate-bounce-in">
          <div className="text-5xl md:text-6xl mb-4 animate-float">🌙</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">ঈদ মোবারক!</h1>

          <div className="my-6">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-secondary shadow-gold" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center mx-auto border-4 border-secondary shadow-gold text-4xl">
                {profile.name[0]}
              </div>
            )}
            <h2 className="text-2xl font-bold mt-4" style={{ color: "hsl(45, 100%, 96%)" }}>{profile.name}</h2>
          </div>

          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-secondary/30">
            <p className="text-lg" style={{ color: "hsl(45, 100%, 90%)" }}>{profile.message}</p>
          </div>

          {profile.paymentNumber && (
            <div className="bg-secondary/20 backdrop-blur-md rounded-2xl p-5 mb-6 border border-secondary/30">
              <p className="text-sm text-gold mb-2">💰 আমাকে ঈদি পাঠান</p>
              <p className="text-xl font-bold" style={{ color: "hsl(45, 100%, 96%)" }}>
                {profile.paymentNumber}
              </p>
              <p className="text-xs mt-1" style={{ color: "hsl(45, 80%, 75%)" }}>বিকাশ / নগদ</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm" style={{ color: "hsl(45, 90%, 80%)" }}>শেয়ার করুন 👇</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button variant="gold" size="sm" onClick={() => share("facebook")} className="rounded-full text-primary-foreground">📘 Facebook</Button>
              <Button variant="gold" size="sm" onClick={() => share("whatsapp")} className="rounded-full text-primary-foreground">💬 WhatsApp</Button>
              <Button variant="gold" size="sm" onClick={() => share("messenger")} className="rounded-full text-primary-foreground">📩 Messenger</Button>
              <Button variant="gold" size="sm" onClick={copyLink} className="rounded-full text-primary-foreground">📋 কপি</Button>
            </div>
          </div>

          <p className="text-xs mt-8" style={{ color: "hsl(45, 80%, 70%)" }}>👁️ {profile.visits + 1} বার দেখা হয়েছে</p>
        </div>
      </div>
    </div>
  );
};

export default EidiPage;
