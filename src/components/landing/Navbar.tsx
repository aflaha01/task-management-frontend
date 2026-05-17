import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 shrink-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">

        </Link>

        {/* Nav actions */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm px-2 sm:px-3"
            asChild
          >
            <Link to="/login">Log in</Link>
          </Button>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-3 sm:px-5 text-xs sm:text-sm"
            asChild
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}