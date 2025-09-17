import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Shield, Clock, ArrowRight, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PostalRepairs = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Postal <span className="text-gradient">Repairs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Can't visit our store? Send your device by post for expert repair. 
            Tracked, insured, and with fast turnaround times.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>1. Book your repair</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tell us your device and issue. We'll email detailed packing instructions 
                  and a prepaid shipping label if requested.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>2. Send it safely</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pack securely and use tracked postage. We provide full insurance coverage 
                  and tracking details for peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>3. We repair & return</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most devices repaired within 1–2 days of arrival and shipped back 
                  the same day with tracking information.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="hero" asChild>
              <Link to="/contact#book" className="group">
                Start Postal Repair
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Why choose postal repair?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold">Convenient</h4>
                  <p className="text-muted-foreground">No need to travel or take time off work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold">Fully Insured</h4>
                  <p className="text-muted-foreground">Your device is covered throughout the process</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold">Fast Turnaround</h4>
                  <p className="text-muted-foreground">Most repairs completed within 48 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold">Same Quality</h4>
                  <p className="text-muted-foreground">Identical service and warranty as in-store repairs</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Typical Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span>Booking & Packing</span>
                  <span className="text-primary font-semibold">Day 1</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span>Transit to Us</span>
                  <span className="text-primary font-semibold">1-2 Days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span>Repair Time</span>
                  <span className="text-accent font-semibold">1-2 Days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span>Return Transit</span>
                  <span className="text-primary font-semibold">1-2 Days</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Time</span>
                    <span className="text-accent">4-7 Days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Postal Repair Pricing</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Standard Shipping</CardTitle>
                <p className="text-muted-foreground">You arrange postage</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">FREE</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Use your own tracked & insured postal service
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Same repair prices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>12-month warranty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Packing guidelines provided</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle>Prepaid Labels</CardTitle>
                <p className="text-muted-foreground">We handle shipping both ways</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">£9.99</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Fully tracked & insured collection and return
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Prepaid collection label</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Full insurance coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Priority handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>SMS tracking updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Express Service</CardTitle>
                <p className="text-muted-foreground">Same day repair & return</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-2">£19.99</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Express courier collection and next-day return
                </p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Express courier pickup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Same-day repair</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Next-day return delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Real-time tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Warranty & Policy */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Warranty & Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              All postal repairs include our standard 12-month warranty on replaced parts and workmanship. 
              Your device is fully insured during transit and while in our possession.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What's Covered</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Replacement parts for 12 months</li>
                  <li>• Workmanship guarantee</li>
                  <li>• Transit insurance up to £1,000</li>
                  <li>• Free re-repair if issues arise</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Limitations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Water damage repairs: 3-month warranty</li>
                  <li>• Board-level repairs: 6-month warranty</li>
                  <li>• Physical damage after repair not covered</li>
                  <li>• Software issues excluded</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostalRepairs;