import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Repair Pricelist", href: "/repairs" },
    { label: "Devices for Sale", href: "/shop" },
    { label: "Sell Your Phone", href: "/sell" },
    { label: "Postal Repairs", href: "/postal-repairs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">DHT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">DHTMobiles</h3>
                  <p className="text-sm text-secondary-foreground/80">You break it. We fix it — fast.</p>
                </div>
              </div>
              <p className="text-secondary-foreground/80 leading-relaxed">
                Professional mobile and tech repair services with same-day fixes, 
                12-month warranty, and trusted quality parts.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-secondary-foreground/80 hover:text-white transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-secondary-foreground/80">01234 567890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-secondary-foreground/80">city@dhtmobiles.example</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-secondary-foreground/80">
                  <div>123 High Street</div>
                  <div>YourTown, AB1 2CD</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-secondary-foreground/80">
                  <div>Mon–Sat: 09:00–18:00</div>
                  <div>Sun: 10:00–16:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-secondary-foreground/80 mb-4">
              Get repair tips and special offers delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="w-full" variant="cta">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-secondary-foreground/60 text-sm">
            © 2024 DHTMobiles. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-secondary-foreground/60 hover:text-white transition-smooth"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;