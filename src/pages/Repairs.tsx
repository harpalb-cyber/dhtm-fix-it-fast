import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Search } from "lucide-react";

const repairData = [
  { id: "ip13-screen", brand: "Apple", model: "iPhone 13", repairType: "Screen Replacement", priceGBP: 159, durationMins: 60, warrantyMonths: 12, notes: "Genuine quality parts" },
  { id: "s22-battery", brand: "Samsung", model: "Galaxy S22", repairType: "Battery Replacement", priceGBP: 89, durationMins: 90, warrantyMonths: 12, notes: "" },
  { id: "ip14-screen", brand: "Apple", model: "iPhone 14", repairType: "Screen Replacement", priceGBP: 199, durationMins: 60, warrantyMonths: 12, notes: "Genuine quality parts" },
  { id: "ip12-battery", brand: "Apple", model: "iPhone 12", repairType: "Battery Replacement", priceGBP: 79, durationMins: 45, warrantyMonths: 12, notes: "" },
  { id: "s23-screen", brand: "Samsung", model: "Galaxy S23", repairType: "Screen Replacement", priceGBP: 189, durationMins: 75, warrantyMonths: 12, notes: "Premium OLED display" },
  { id: "ipadair-screen", brand: "Apple", model: "iPad Air", repairType: "Screen Replacement", priceGBP: 249, durationMins: 120, warrantyMonths: 12, notes: "Precision repair required" },
];

const Repairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [repairTypeFilter, setRepairTypeFilter] = useState("all");

  const filteredRepairs = repairData.filter((repair) => {
    const matchesSearch = repair.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === "all" || repair.brand === brandFilter;
    const matchesRepairType = repairTypeFilter === "all" || repair.repairType === repairTypeFilter;
    
    return matchesSearch && matchesBrand && matchesRepairType;
  });

  const brands = [...new Set(repairData.map(item => item.brand))];
  const repairTypes = [...new Set(repairData.map(item => item.repairType))];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Repair <span className="text-gradient">Pricelist</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for popular phone and tablet repairs. All repairs include our 12-month warranty.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search device..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={repairTypeFilter} onValueChange={setRepairTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Repairs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Repairs</SelectItem>
                {repairTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setBrandFilter("all");
              setRepairTypeFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Repair Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRepairs.map((repair) => (
            <Card key={repair.id} className="hover:shadow-hover transition-smooth">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{repair.brand} {repair.model}</CardTitle>
                    <p className="text-muted-foreground">{repair.repairType}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    £{repair.priceGBP}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{repair.durationMins} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>{repair.warrantyMonths}mo warranty</span>
                  </div>
                </div>
                
                {repair.notes && (
                  <p className="text-sm text-muted-foreground">{repair.notes}</p>
                )}

                <Button className="w-full" variant="cta">
                  Book This Repair
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRepairs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No repairs found matching your criteria.</p>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-muted/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">How long do repairs take?</h3>
              <p className="text-muted-foreground">Most phones are repaired same day, often within 60–90 minutes depending on the issue.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you use quality parts?</h3>
              <p className="text-muted-foreground">Yes, all parts are sourced from trusted suppliers and include a 12-month warranty unless stated otherwise.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What if my device can't be repaired?</h3>
              <p className="text-muted-foreground">We offer a free diagnostic. If repair isn't possible, there's no charge for the assessment.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer collection and delivery?</h3>
              <p className="text-muted-foreground">Yes, we offer postal repair service for your convenience. Fully insured and tracked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repairs;