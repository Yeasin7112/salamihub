import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FestiveBackground } from "@/components/FestiveBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VoiceWish = () => {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState("");
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      // Auto-stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
          setRecording(false);
        }
      }, 30000);
    } catch {
      toast.error("মাইক্রোফোন অ্যাক্সেস দিন!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSave = async () => {
    if (!audioBlob) {
      toast.error("আগে রেকর্ড করুন!");
      return;
    }
    setLoading(true);
    const id = Math.random().toString(36).slice(2, 10);
    const fileName = `${id}.webm`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("voice-wishes")
        .upload(fileName, audioBlob, { contentType: "audio/webm" });
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage.from("voice-wishes").getPublicUrl(fileName);

      const { error } = await supabase.from("voice_wishes").insert({
        id,
        sender_name: senderName.trim() || "অজানা",
        audio_url: publicUrl.publicUrl,
      });
      if (error) throw error;

      toast.success("ভয়েস উইশ তৈরি হয়েছে! 🎉");
      navigate(`/voice/${id}`);
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
          <div className="text-5xl mb-3">🎤</div>
          <h1 className="text-3xl font-bold text-primary">ভয়েস ঈদ উইশ</h1>
          <p className="text-muted-foreground mt-2">আপনার কণ্ঠে ঈদের শুভেচ্ছা পাঠান!</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-festive space-y-5 animate-slide-up">
          <div>
            <label className="block text-sm font-semibold mb-2">📛 আপনার নাম (ঐচ্ছিক)</label>
            <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="আপনার নাম" className="rounded-xl" />
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">🎙️ সর্বোচ্চ ৩০ সেকেন্ড রেকর্ড করতে পারবেন</p>

            {!recording && !audioUrl && (
              <Button variant="festive" size="lg" className="rounded-full text-lg" onClick={startRecording}>
                🎤 রেকর্ড শুরু করুন
              </Button>
            )}

            {recording && (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="text-destructive font-semibold">রেকর্ডিং চলছে...</span>
                </div>
                <Button variant="destructive" size="lg" className="rounded-full" onClick={stopRecording}>
                  ⏹️ বন্ধ করুন
                </Button>
              </div>
            )}

            {audioUrl && (
              <div className="space-y-3">
                <audio controls src={audioUrl} className="mx-auto" />
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => { setAudioBlob(null); setAudioUrl(null); }}>
                    🔄 আবার রেকর্ড
                  </Button>
                </div>
              </div>
            )}
          </div>

          {audioUrl && (
            <Button variant="festive" size="lg" className="w-full rounded-full text-lg" onClick={handleSave} disabled={loading}>
              {loading ? "সেভ হচ্ছে... ⏳" : "🎉 ভয়েস উইশ পাঠান"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceWish;
