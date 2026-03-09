import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FestiveBackground } from "@/components/FestiveBackground";
import { createProfile } from "@/lib/eidiStore";
import { toast } from "sonner";

const CreateEidi = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("ঈদ মোবারক! আপনার জন্য শুভকামনা 🌙");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("আপনার নাম দিন!");
      return;
    }
    setLoading(true);
    try {
      const profile = await createProfile({ name: name.trim(), photo, message, paymentNumber });
      toast.success("ঈদি লিংক তৈরি হয়েছে! 🎉");
      navigate(`/eidi/${profile.id}`);
    } catch {
      toast.error("কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="text-5xl mb-3">🎁</div>
          <h1 className="text-3xl font-bold text-primary">ঈদি লিংক তৈরি করুন</h1>
          <p className="text-muted-foreground mt-2">নিজের ঈদি পেজ বানান ও বন্ধুদের শেয়ার করুন!</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-festive space-y-5 animate-slide-up">
          <div>
            <label className="block text-sm font-semibold mb-2">📛 আপনার নাম *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম লিখুন" className="rounded-xl" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">📸 ছবি (ঐচ্ছিক)</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
            {photo && <img src={photo} alt="preview" className="mt-3 w-24 h-24 rounded-full object-cover mx-auto border-4 border-secondary" />}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">💌 ঈদ মেসেজ</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">💳 বিকাশ/নগদ নম্বর (ঐচ্ছিক)</label>
            <Input value={paymentNumber} onChange={(e) => setPaymentNumber(e.target.value)} placeholder="01XXXXXXXXX" className="rounded-xl" />
          </div>

          <Button variant="festive" size="lg" className="w-full rounded-full text-lg" onClick={handleCreate} disabled={loading}>
            {loading ? "তৈরি হচ্ছে... ⏳" : "🎉 ঈদি লিংক তৈরি করুন"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEidi;
