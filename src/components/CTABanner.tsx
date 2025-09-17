import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="py-16 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center text-white space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Trade-in or upgrade today
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Sell your old phone or grab a refurbished device with warranty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="secondary" size="hero" asChild>
              <Link to="/sell" className="group">
                <Smartphone className="w-5 h-5" />
                Sell your phone
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="hero" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/shop">Shop devices</Link>
            </Button>
          </div>

          {/* Value props */}
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-center">
            <div>
              <div className="text-2xl font-bold mb-2">Instant Quotes</div>
              <div className="text-white/80">Get a price estimate in seconds</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Best Prices</div>
              <div className="text-white/80">Competitive rates for your device</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-2">Fast Payment</div>
              <div className="text-white/80">Same-day payment on collection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;