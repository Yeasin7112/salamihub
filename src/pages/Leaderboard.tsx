import { useState, useEffect } from "react";
import { FestiveBackground } from "@/components/FestiveBackground";
import { getLeaderboard, type EidiProfile } from "@/lib/eidiStore";

const medals = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<EidiProfile[]>([]);

  useEffect(() => {
    setLeaders(getLeaderboard());
  }, []);

  return (
    <div className="relative min-h-screen">
      <FestiveBackground />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        <div className="text-center mb-8 animate-bounce-in">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-3xl font-bold text-primary">ঈদি লিডারবোর্ড</h1>
          <p className="text-muted-foreground mt-2">সবচেয়ে জনপ্রিয় ঈদি পেজ!</p>
        </div>

        <div className="space-y-3 animate-slide-up">
          {leaders.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center shadow-festive">
              <p className="text-muted-foreground">এখনো কোনো ঈদি পেজ তৈরি হয়নি!</p>
              <p className="text-sm text-muted-foreground mt-2">প্রথম হতে চান? ঈদি লিংক তৈরি করুন! 🎁</p>
            </div>
          ) : (
            leaders.map((p, i) => (
              <div key={p.id} className="bg-card rounded-2xl p-4 shadow-festive flex items-center gap-4">
                <div className="text-2xl w-10 text-center">{medals[i] || `${i + 1}`}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.visits} বার দেখা হয়েছে</p>
                </div>
                {p.photo && <img src={p.photo} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-secondary" />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
