import { Link } from "react-router-dom";
import { Phone, Send, ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { assets } from "@/assets/dht";
import { business, phoneUrl, directionsUrl, whatsappUrl, whatsappNumber } from "@/lib/customer-services";

export function Artwork({ name, alt = "", className = "" }: { name: string; alt?: string; className?: string }) {
  const asset = assets[name];
  return asset ? <img src={asset.url} alt={alt} className={className} width="80" height="80" loading={name === "art" || name === "logo" ? "eager" : "lazy"} /> : null;
}
export function PageIntro({ title, description }: { title: string; description: string }) {
  return <section className="page-intro"><div className="site-container"><h1>{title}</h1><p>{description}</p></div></section>;
}
export function ContactActions({ subject = "DHT Mobiles enquiry", body = "" }: { subject?: string; body?: string }) {
  return <div className="action-row"><Button asChild><a href={phoneUrl}><Phone />Call the shop</a></Button><Button variant="outline" asChild><a href={emailDraftUrl(subject, body)}><Mail />Open email draft</a></Button></div>;
}
export function ShopLocation() {
  return <aside className="location-panel"><MapPin className="text-primary" size={28} /><h3>Find the shop.</h3><p>{business.address}</p><Button asChild><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></Button><h4>Talk to DHT</h4><a className="text-link" href={phoneUrl}>{business.phone}</a><a className="text-link break-all" href={emailDraftUrl("DHT Mobiles enquiry")}>{business.email}</a><h4>Opening hours</h4><p>Call to confirm opening hours before visiting.</p><div className="action-row"><a className="text-link" href={business.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a className="text-link" href={business.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div></aside>;
}
export const faqs = [
  ["Can I see a price before booking?", "Choose your device and the issues you want help with. Current prices are available by quote from DHT; ask the shop to confirm the price and parts before agreeing a repair."],
  ["Is a drop-off time a guaranteed completion time?", "No. Please agree your visit with the shop. Repair time depends on the device, diagnosis and parts availability; DHT will confirm the arrangements."],
  ["How do postal repairs work?", "Contact DHT before posting. Agree the repair, packing instructions, charges and return arrangements with the shop first."],
  ["Can I sell my phone to DHT?", "You can send a manual sell-device enquiry. Online valuations are coming soon, and an enquiry does not commit you to selling."],
];
export function FAQs({ title = "Repair questions, answered." }: { title?: string }) {
  return <section className="section-pad"><div className="site-container"><h2>{title}</h2><Accordion type="single" collapsible className="faq-list">{faqs.map(([q, a], i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger className="text-left gap-4">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent></AccordionItem>)}</Accordion><Link className="text-link inline-block mt-5" to="/help">More help <span aria-hidden="true">↗</span></Link></div></section>;
}
export const brandNames = ["Apple", "Samsung", "Google", "Huawei", "OnePlus", "Xiaomi", "Motorola", "OPPO", "Honor", "Nokia", "Sony", "Realme", "Nothing", "HP", "Dell", "Lenovo", "ASUS", "Microsoft"];
export function BrandTile({ name, onClick, selected }: { name: string; onClick?: () => void; selected?: boolean }) {
  const content = <><Artwork name={name.toLowerCase()} /><strong>{name}</strong><span>Enquire about a repair ↗</span></>;
  return onClick ? <Button variant="outline" className={`brand-tile ${selected ? "is-selected" : ""}`} onClick={onClick} aria-pressed={selected}>{content}</Button> : <Button variant="outline" className="brand-tile" asChild><Link to={`/repairs?brand=${encodeURIComponent(name)}`}>{content}</Link></Button>;
}