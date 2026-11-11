import { ArrowUpRight, CircuitBoard, Gamepad2, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { slug: "microsoldering", title: "Microsoldering", description: "Get in touch about faults that may need detailed work on a device's circuit board.", icon: CircuitBoard },
  { slug: "computer-repairs", title: "Laptop & computer repairs", description: "Tell us what's wrong with your laptop or desktop computer and we'll discuss how we can help.", icon: Laptop },
  { slug: "console-repairs", title: "Games console repairs & upgrades", description: "Ask us about repairs or upgrades for your games console, whatever the issue.", icon: Gamepad2 },
];

export default function AdditionalServices() {
  return <section className="section-pad" aria-labelledby="additional-services-heading"><div className="site-container">
    <div className="section-heading"><div><h2 id="additional-services-heading">More ways we can help.</h2><p>Tell us about your device and we'll discuss the next step.</p></div></div>
    <div className="grid gap-5 md:grid-cols-3">{services.map(({ slug, title, description, icon: Icon }) => <article key={title} className="rounded-xl border border-border bg-card p-6 min-w-0 flex flex-col items-start gap-4">
      <Icon className="text-primary" size={28} aria-hidden="true" /><h3 className="text-xl font-bold">{title}</h3><p className="text-muted-foreground flex-1">{description}</p>
      <Button asChild variant="outline" className="w-full mt-auto"><Link aria-label={`Explore ${title.toLowerCase()}`} to={`/services/${slug}`}>Explore this service <ArrowUpRight /></Link></Button>
    </article>)}</div>
  </div></section>;
}
