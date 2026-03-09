import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { path: "/", label: "🏠 হোম" },
  { path: "/create", label: "🎁 ঈদি লিংক" },
  { path: "/spin", label: "🎡 ঈদি চরকা" },
  { path: "/roast", label: "😆 রোস্ট" },
  { path: "/secret", label: "🤫 সিক্রেট" },
  { path: "/dp", label: "🖼️ DP" },
  { path: "/voice", label: "🎤 ভয়েস" },
  { path: "/leaderboard", label: "🏆 লিডারবোর্ড" },
  { path: "/founder", label: "❤️ ফাউন্ডার" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <span className="text-2xl">🌙</span>
          <span className="text-xl font-extrabold tracking-tight">
            Eid<span className="text-secondary">Hub</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 animate-slide-up">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
