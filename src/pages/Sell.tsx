import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, CreditCard, Package, CheckCircle } from "lucide-react";

const Sell = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    condition: "",
    email: "",
    phone: ""
  });

  const [quote, setQuote] = useState<{ estimateGBP: number; validityDays: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock quote calculation
    const basePrice = 150;
    const conditionMultipliers = {
      "Like New": 1.0,
      "Good": 0.85,
      "Fair": 0.7,
      "Poor": 0.5,
      "Faulty": 0.3
    };
    
    const multiplier = conditionMultipliers[formData.condition as keyof typeof conditionMultipliers] || 0.5;
    const estimate = Math.round(basePrice * multiplier);
    
    setQuote({ estimateGBP: estimate, validityDays: 7 });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sell Your <span className="text-gradient">Phone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant quote for your old device. Quick, easy, and fair prices guaranteed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quote Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Get an instant quote</CardTitle>
              <p className="text-muted-foreground">
                Tell us about your device and get a price estimate in seconds.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="OnePlus">OnePlus</SelectItem>
                      <SelectItem value="Huawei">Huawei</SelectItem>
                      <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    placeholder="e.g., iPhone 13"
                    value={formData.model}
                    onChange={(e) => handleInputChange("model", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Faulty">Faulty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01234 567890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero" 
                  size="hero"
                  disabled={!formData.brand || !formData.model || !formData.condition || !formData.email}
                >
                  <Smartphone className="w-5 h-5" />
                  Get My Quote
                </Button>

                <p className="text-sm text-muted-foreground">
                  We only use your details to provide your quote and will never spam you.
                </p>
              </form>

              {/* Quote Result */}
              {quote && (
                <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      £{quote.estimateGBP}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Estimated value for your {formData.brand} {formData.model}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Quote valid for {quote.validityDays} days
                    </p>
                    <Button variant="accent" className="w-full">
                      Accept Quote & Book Collection
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* How it Works */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">How it works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">1. Submit your device details</h3>
                      <p className="text-muted-foreground">
                        Tell us about your device brand, model, and condition for an instant estimate.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">2. Book drop-off or post</h3>
                      <p className="text-muted-foreground">
                        Visit our store or request a prepaid postage label for safe delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">3. Get paid quickly</h3>
                      <p className="text-muted-foreground">
                        We inspect and confirm your final payout within 1–2 working days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Bank Transfer</span>
                    <span className="text-accent font-semibold">Same day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>PayPal</span>
                    <span className="text-accent font-semibold">Instant</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span>Cash (in-store)</span>
                    <span className="text-accent font-semibold">Immediate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Price Guarantee */}
            <div className="bg-gradient-accent text-white rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-white/90">
                Find a better quote elsewhere? We'll match it and add an extra £5.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;