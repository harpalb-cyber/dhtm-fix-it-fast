import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Star, Shield } from "lucide-react";

const products = [
  { 
    sku: "DHT-IP12-128-GRN", 
    title: "iPhone 12 128GB (Green) – Refurbished A", 
    description: "Fully tested, 12-month warranty, unlocked.", 
    images: ["/assets/products/ip12-green.jpg"], 
    priceGBP: 299, 
    condition: "Refurbished", 
    brand: "Apple", 
    storage: "128GB", 
    colour: "Green", 
    stock: 4 
  },
  { 
    sku: "USB-C-1M", 
    title: "USB-C Cable 1m", 
    description: "Fast charging cable.", 
    images: ["/assets/products/usb-c.jpg"], 
    priceGBP: 9.99, 
    condition: "New", 
    brand: "DHT", 
    storage: "", 
    colour: "White", 
    stock: 50 
  },
  {
    sku: "DHT-S22-256-BLK",
    title: "Samsung Galaxy S22 256GB (Black) – Refurbished A",
    description: "Excellent condition, fully tested, 12-month warranty.",
    images: ["/assets/products/s22-black.jpg"],
    priceGBP: 399,
    condition: "Refurbished",
    brand: "Samsung",
    storage: "256GB",
    colour: "Black",
    stock: 2
  },
  {
    sku: "CASE-IP13-CLEAR",
    title: "iPhone 13 Clear Case",
    description: "Crystal clear protection for your iPhone 13.",
    images: ["/assets/products/case-clear.jpg"],
    priceGBP: 14.99,
    condition: "New",
    brand: "DHT",
    storage: "",
    colour: "Clear",
    stock: 25
  }
];

const Shop = () => {
  const [brandFilter, setBrandFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products
    .filter((product) => {
      const matchesBrand = brandFilter === "all" || product.brand === brandFilter;
      const matchesCondition = conditionFilter === "all" || product.condition === conditionFilter;
      return matchesBrand && matchesCondition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceGBP - b.priceGBP;
        case "price-high":
          return b.priceGBP - a.priceGBP;
        case "name":
        default:
          return a.title.localeCompare(b.title);
      }
    });

  const brands = [...new Set(products.map(item => item.brand))];
  const conditions = [...new Set(products.map(item => item.condition))];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "New":
        return "bg-accent/10 text-accent";
      case "Refurbished":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Devices for <span className="text-gradient">Sale</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quality refurbished phones and accessories with warranty. All devices are unlocked and fully tested.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
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

            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setBrandFilter("all");
              setConditionFilter("all");
              setSortBy("name");
            }}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.sku} className="hover:shadow-hover transition-smooth">
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Product Image</div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base leading-tight">{product.title}</CardTitle>
                    <Badge className={getConditionColor(product.condition)}>
                      {product.condition}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  
                  {product.storage && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{product.storage}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={`font-medium ${product.stock < 5 ? 'text-destructive' : 'text-accent'}`}>
                      {product.stock} available
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-2xl font-bold text-primary">
                      £{product.priceGBP}
                    </div>
                    <Button variant="cta" size="sm" className="gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-subtle rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">12-Month Warranty</h3>
              <p className="text-muted-foreground">All refurbished devices come with comprehensive warranty coverage.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Tested</h3>
              <p className="text-muted-foreground">Every device undergoes rigorous testing before sale.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Collection</h3>
              <p className="text-muted-foreground">Click & collect available from our store locations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;