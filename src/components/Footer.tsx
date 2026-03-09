import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-12 pb-6">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-primary/30" />
            <span className="text-secondary text-sm">🌙</span>
            <span className="h-px w-10 bg-primary/30" />
          </div>
          <p className="text-base font-semibold text-primary tracking-wide">
            Made with Eid spirit, laughter & a little bit of code <span className="text-secondary">✨</span>
          </p>
          <Link
            to="/founder"
            className="inline-block text-xs font-medium text-secondary hover:text-primary transition-colors"
          >
            ❤️ Support the Founder
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
