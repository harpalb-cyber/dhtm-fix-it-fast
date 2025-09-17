import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Repair Pricelist", href: "/repairs" },
    { label: "Devices for Sale", href: "/shop" },
    { label: "Sell Your Phone", href: "/sell" },
    { label: "Postal Repairs", href: "/postal-repairs" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="py-2 border-b text-sm text-muted-foreground hidden md:flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>01234 567890</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>123 High Street, YourTown</span>
            </div>
          </div>
          <div className="text-sm font-medium text-accent">
            12-month warranty on all repairs
          </div>
        </div>

        {/* Main navigation */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DHT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">DHTMobiles</h1>
              <p className="text-xs text-muted-foreground">You break it. We fix it — fast.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="cta" size="sm" asChild>
              <Link to="/contact#book">Book Repair</Link>
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="lg:hidden py-4 border-t">
          <div className="grid grid-cols-3 gap-2">
            {navigationItems.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-center py-2 px-3 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-smooth"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;