import { Star } from "lucide-react";

const testimonials = [
  { name: "A. Patel", rating: 5, comment: "Cracked screen fixed in under an hour. Great service!" },
  { name: "J. Brown", rating: 5, comment: "Battery swap made my phone feel new again." },
  { name: "M. Wilson", rating: 5, comment: "Professional, fast, and affordable. Highly recommend!" },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What our customers say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust DHTMobiles
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-hover transition-smooth"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground mb-4 italic">
                "{testimonial.comment}"
              </blockquote>
              <cite className="text-sm font-semibold text-muted-foreground">
                — {testimonial.name}
              </cite>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Devices Repaired</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">60min</div>
            <div className="text-sm text-muted-foreground">Average Repair Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">12mo</div>
            <div className="text-sm text-muted-foreground">Warranty Period</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;