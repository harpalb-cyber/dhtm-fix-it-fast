import { Button } from "@/components/ui/button";
import { Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-repair.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Broken device?{" "}
                <span className="text-gradient">We'll fix it today.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Same-day repairs on iPhone, Samsung, iPad & more — with a 12-month warranty.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="hero" asChild>
                <Link to="/repairs">See Repair Prices</Link>
              </Button>
              <Button variant="outline" size="hero" asChild>
                <Link to="/postal-repairs">Book Postal Repair</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Same-day service</h3>
                <p className="text-xs text-muted-foreground">Most fixes in 60–90 mins</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-sm">12-month warranty</h3>
                <p className="text-xs text-muted-foreground">Quality parts & aftercare</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Central locations</h3>
                <p className="text-xs text-muted-foreground">Easy drop-off & pickup</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-hover">
              <img
                src={heroImage}
                alt="Professional mobile phone repair service showing hands expertly fixing a smartphone"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white shadow-card rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;