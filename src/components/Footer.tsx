import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-12 pb-6">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-secondary/40" />
            <span className="text-secondary text-xs">✦</span>
            <span className="h-px w-8 bg-secondary/40" />
          </div>
          <p className="text-sm font-medium italic bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
            Made with Eid spirit, laughter, and a little bit of code ✨
          </p>
          <Link
            to="/founder"
            className="inline-block text-xs text-muted-foreground/70 hover:text-secondary transition-colors"
          >
            ❤️ Support the Founder
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
