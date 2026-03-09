import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FestiveBackground } from "@/components/FestiveBackground";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VoiceWishPlay = () => {
  const { id } = useParams();
  const [wish, setWish] = useState<{ sender_name: string; audio_url: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const { data } = await supabase.from("voice_wishes").select("*").eq("id", id).single();
        if (data) setWish(data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

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

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-bounce-in">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-xl text-muted-foreground">ভয়েস উইশ খুঁজে পাওয়া যায়নি!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FestiveBackground variant="dark" />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        <div className="animate-bounce-in">
          <div className="text-6xl mb-4 animate-float">🌙</div>
          <h1 className="text-3xl font-bold text-gold mb-2">ঈদ মোবারক!</h1>
          <p className="text-gold/70 mb-8">
            {wish.sender_name !== "অজানা" ? `${wish.sender_name}` : "কেউ একজন"} আপনাকে ভয়েস ঈদ উইশ পাঠিয়েছে 🎤
          </p>

          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-secondary/30">
            <div className="text-5xl mb-4">🎤</div>
            <audio controls src={wish.audio_url} className="mx-auto w-full max-w-xs" />
          </div>

          <div className="flex justify-center gap-3">
            <Button variant="gold" size="sm" className="rounded-full" onClick={copyLink}>📋 লিংক কপি</Button>
            <Button
              variant="gold"
              size="sm"
              className="rounded-full"
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("তোমার জন্য ভয়েস ঈদ উইশ! 🎤🌙 " + window.location.href)}`, "_blank")}
            >
              💬 WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceWishPlay;
