import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FestiveBackground } from "@/components/FestiveBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SecretMessage = () => {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!message.trim()) {
      toast.error("মেসেজ লিখুন!");
      return;
    }
    setLoading(true);
    const id = Math.random().toString(36).slice(2, 10);
    try {
      const { error } = await supabase.from("secret_messages").insert({
        id,
        sender_name: senderName.trim() || "অজানা",
        message: message.trim(),
      });
      if (error) throw error;
      toast.success("সিক্রেট মেসেজ তৈরি হয়েছে! 🎉");
      navigate(`/secret/${id}`);
    } catch {
      toast.error("সমস্যা হয়েছে, আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="text-5xl mb-3">🤫</div>
          <h1 className="text-3xl font-bold text-primary">সিক্রেট ঈদ মেসেজ</h1>
          <p className="text-muted-foreground mt-2">গোপন ঈদ মেসেজ পাঠান বন্ধুদের!</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-festive space-y-5 animate-slide-up">
          <div>
            <label className="block text-sm font-semibold mb-2">📛 আপনার নাম (ঐচ্ছিক)</label>
            <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="আপনার নাম" className="rounded-xl" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">💌 গোপন মেসেজ *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="আপনার গোপন ঈদ মেসেজ লিখুন..."
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="festive" size="lg" className="w-full rounded-full text-lg" onClick={handleCreate} disabled={loading}>
            {loading ? "তৈরি হচ্ছে... ⏳" : "🤫 সিক্রেট লিংক তৈরি করুন"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecretMessage;
