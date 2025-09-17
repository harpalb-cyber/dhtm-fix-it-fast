import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
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
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with DHTMobiles — phone, email, or visit our store. We're here to help with all your tech needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Store Location & Map */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">DHTMobiles – City Centre</h3>
                    <p className="text-muted-foreground">123 High Street, YourTown, AB1 2CD</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">01234 567890</p>
                        <p className="text-sm text-muted-foreground">Call us</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">city@dhtmobiles.example</p>
                        <p className="text-sm text-muted-foreground">Email us</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Monday - Saturday: 09:00 - 18:00</p>
                        <p>Sunday: 10:00 - 16:00</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 High Street, YourTown</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">From city center</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">Free</div>
                <div className="text-sm text-muted-foreground">Parking available</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-card" id="book">
            <CardHeader>
              <CardTitle>Book a repair / Ask a question</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 1 hour during business hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="service">Service</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Screen Repair">Screen Repair</SelectItem>
                      <SelectItem value="Battery Replacement">Battery Replacement</SelectItem>
                      <SelectItem value="Charging Issue">Charging Issue</SelectItem>
                      <SelectItem value="Data Recovery">Data Recovery</SelectItem>
                      <SelectItem value="Water Damage">Water Damage</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your device issue or question..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero" 
                  size="hero"
                  disabled={!formData.name || !formData.email || !formData.message}
                >
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your inquiry.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Do I need to book an appointment?</h3>
                <p className="text-muted-foreground">
                  Walk-ins are welcome, but booking ensures faster service and guaranteed time slots.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How long do repairs typically take?</h3>
                <p className="text-muted-foreground">
                  Most common repairs (screens, batteries) are completed within 60-90 minutes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer same-day service?</h3>
                <p className="text-muted-foreground">
                  Yes! Most repairs are completed the same day, often while you wait.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What if you can't fix my device?</h3>
                <p className="text-muted-foreground">
                  We offer free diagnostics. If repair isn't possible, there's no charge for the assessment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you provide data backup services?</h3>
                <p className="text-muted-foreground">
                  Yes, we can help backup your data before repair if your device is still functional.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept cash, all major credit/debit cards, and contactless payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;