import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FestiveBackground } from "@/components/FestiveBackground";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SecretReveal = () => {
  const { id } = useParams();
  const [message, setMessage] = useState<{ sender_name: string; message: string } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const { data } = await supabase.from("secret_messages").select("*").eq("id", id).single();
        if (data) setMessage(data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleReveal = () => {
    setShowFireworks(true);
    setTimeout(() => {
      setRevealed(true);
      setShowFireworks(false);
    }, 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("লিংক কপি হয়েছে! 📋");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-float">🌙</div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-muted-foreground">মেসেজ খুঁজে পাওয়া যায়নি!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FestiveBackground variant="dark" />

      {showFireworks && (
        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-8xl animate-firework">🎆</div>
          <div className="text-7xl animate-firework" style={{ animationDelay: "0.3s" }}>✨</div>
          <div className="text-6xl animate-firework" style={{ animationDelay: "0.6s" }}>🎇</div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        {!revealed ? (
          <div className="animate-bounce-in">
            <div className="text-8xl mb-6 animate-float">🎁</div>
            <h1 className="text-3xl font-bold text-gold mb-4">আপনার জন্য একটি গোপন মেসেজ!</h1>
            <p className="text-gold/70 mb-8">
              {message.sender_name !== "অজানা" ? `${message.sender_name} থেকে` : "কেউ একজন"} আপনাকে একটি ঈদ মেসেজ পাঠিয়েছে 🌙
            </p>
            <Button variant="festive" size="lg" className="rounded-full text-lg px-10" onClick={handleReveal}>
              🤫 মেসেজ দেখুন!
            </Button>
          </div>
        ) : (
          <div className="animate-bounce-in">
            <div className="text-6xl mb-4">🌙</div>
            <h1 className="text-3xl font-bold text-gold mb-6">ঈদ মোবারক!</h1>

            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-secondary/30">
              <p className="text-xl" style={{ color: "hsl(45, 100%, 90%)" }}>{message.message}</p>
              {message.sender_name !== "অজানা" && (
                <p className="text-gold/70 mt-4 text-sm">— {message.sender_name}</p>
              )}
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="gold" size="sm" className="rounded-full text-primary-foreground" onClick={copyLink}>📋 লিংক কপি</Button>
              <Button
                variant="gold"
                size="sm"
                className="rounded-full text-primary-foreground"
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("তোমার জন্য একটি গোপন ঈদ মেসেজ! 🤫🌙 " + window.location.href)}`, "_blank")}
              >
                💬 WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretReveal;
