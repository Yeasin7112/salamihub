import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FestiveBackground } from "@/components/FestiveBackground";

const DPGenerator = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhoto(ev.target?.result as string);
        setGenerated(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateDP = useCallback(() => {
    if (!photo || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 800;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Draw background gradient
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, "hsl(152, 70%, 20%)");
      grad.addColorStop(1, "hsl(230, 35%, 15%)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Draw user photo in circle
      const photoSize = 480;
      const photoX = (size - photoSize) / 2;
      const photoY = 80;

      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const aspect = img.width / img.height;
      let sx = 0, sy = 0, sw = img.width, sh = img.height;
      if (aspect > 1) {
        sx = (img.width - img.height) / 2;
        sw = img.height;
      } else {
        sy = (img.height - img.width) / 2;
        sh = img.width;
      }
      ctx.drawImage(img, sx, sy, sw, sh, photoX, photoY, photoSize, photoSize);
      ctx.restore();

      // Circle border
      ctx.beginPath();
      ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 4, 0, Math.PI * 2);
      ctx.strokeStyle = "hsl(43, 85%, 55%)";
      ctx.lineWidth = 8;
      ctx.stroke();

      // Stars
      ctx.font = "30px serif";
      const starPositions = [
        [60, 50], [700, 80], [100, 700], [680, 650], [50, 350], [740, 400],
        [200, 40], [600, 40], [350, 30],
      ];
      starPositions.forEach(([x, y]) => {
        ctx.fillText("✦", x, y);
      });

      // Lanterns
      ctx.font = "50px serif";
      ctx.fillText("🏮", 30, 120);
      ctx.fillText("🏮", 700, 150);

      // Moon
      ctx.font = "70px serif";
      ctx.fillText("🌙", 350, 70);

      // "Eid Mubarak" text
      ctx.font = "bold 50px 'Hind Siliguri', sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "hsl(43, 85%, 55%)";
      ctx.fillText("ঈদ মোবারক!", size / 2, 650);

      // Subtitle
      ctx.font = "24px 'Hind Siliguri', sans-serif";
      ctx.fillStyle = "hsl(45, 100%, 90%)";
      ctx.fillText("EidiLink 🌙", size / 2, 700);

      // Bottom decorative dots
      ctx.fillStyle = "hsl(43, 85%, 55%)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(300 + i * 50, 740, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      setGenerated(true);
    };
    img.src = photo;
  }, [photo]);

  const downloadDP = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "eid-dp.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const shareDP = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([blob], "eid-dp.png", { type: "image/png" })],
            title: "ঈদ মোবারক!",
            text: "আমার ঈদ DP দেখুন! 🌙",
          });
        } catch {}
      }
    });
  };

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg text-center">
        <div className="animate-bounce-in mb-8">
          <div className="text-5xl mb-3">🖼️</div>
          <h1 className="text-3xl font-bold text-primary">ঈদ DP জেনারেটর</h1>
          <p className="text-muted-foreground mt-2">আপনার ছবি দিয়ে ঈদ DP বানান!</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-festive space-y-5 animate-slide-up">
          <div>
            <label className="block text-sm font-semibold mb-2">📸 আপনার ছবি আপলোড করুন</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {photo && !generated && (
            <Button variant="festive" size="lg" className="w-full rounded-full text-lg" onClick={generateDP}>
              🎨 DP তৈরি করুন
            </Button>
          )}

          <canvas ref={canvasRef} className={`mx-auto rounded-xl max-w-full ${generated ? "block" : "hidden"}`} />

          {generated && (
            <div className="flex gap-3 justify-center">
              <Button variant="festive" size="lg" className="rounded-full" onClick={downloadDP}>
                📥 ডাউনলোড
              </Button>
              {navigator.share && (
                <Button variant="gold" size="lg" className="rounded-full" onClick={shareDP}>
                  📤 শেয়ার
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DPGenerator;
