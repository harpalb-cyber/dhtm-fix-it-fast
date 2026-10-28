import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { launch } from "@/lib/customer-services";

const descriptions: Record<string, [string, string]> = {
  "/": ["DHT Mobiles | Phone & tech repair enquiries in Littleover, Derby", "Life happens. We fix it. Explore device repair enquiries, phones and accessories, and contact DHT Mobiles in Littleover, Derby."],
  "/training/mobile-phone-repair-course": ["Beginner Phone Repair Course Derby | DHT Mobiles", "Learn iPhone and Samsung repair basics at DHT Mobiles in Derby. One-day Sunday training, small groups, equipment provided and hands-on practice."],
  "/repairs": ["Find your repair | DHT Mobiles", "Find your phone, tablet, laptop or watch and ask DHT for a repair quote."],
  "/shop": ["Phones & accessories | DHT Mobiles", "Enquire about current phones and accessories at DHT Mobiles, Littleover."],
  "/contact": ["Contact DHT Mobiles | Littleover, Derby", "Call DHT Mobiles, open an email enquiry or find directions to the Littleover shop."],
  "/postal-repairs": ["Postal repair enquiries | DHT Mobiles", "Contact DHT before sending a device for postal repair. Agree your quote and postage arrangements first."],
  "/sell": ["Sell your device enquiry | DHT Mobiles", "Ask DHT about selling your device. Manual enquiries; online valuations coming soon."],
  "/about": ["About DHT Mobiles | Littleover", "Meet your local DHT Mobiles shop in Littleover, Derby."],
  "/help": ["Customer help | DHT Mobiles", "Help with device identification, repair enquiries, postal repairs and shopping."],
  "/track-repair": ["Repair updates | DHT Mobiles", "Contact DHT Mobiles for an update about your repair."],
  "/cart": ["Basket | DHT Mobiles", "Information about online ordering availability at DHT Mobiles."],
  "/checkout": ["Ordering availability | DHT Mobiles", "Contact DHT to confirm availability and purchase arrangements."],
  "/terms": ["Terms | DHT Mobiles", "Customer terms awaiting owner approval. Contact DHT for the terms applicable to your enquiry."],
  "/privacy": ["Privacy | DHT Mobiles", "Privacy information for DHT customer enquiries, awaiting owner review."],
  "/policies": ["Service & privacy information | DHT Mobiles", "Find DHT terms and privacy information."],
};
export default function Seo() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const [title, description] = descriptions[pathname] || (pathname.startsWith("/shop/") ? ["Product availability | DHT Mobiles", "Ask DHT about current approved stock."] : ["Page not found | DHT Mobiles", "Find repairs, shopping and contact information at DHT Mobiles."]);
    document.title = title;
    function meta(name: string, content: string, property = false) {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${property ? "property" : "name"}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(property ? "property" : "name", name); document.head.appendChild(el); }
      el.content = content;
    }
    meta("description", description); meta("og:title", title, true); meta("og:description", description, true); meta("og:type", "website", true); meta("twitter:card", "summary"); meta("twitter:title", title); meta("twitter:description", description);
    document.head.querySelector('link[rel="canonical"]')?.remove();
    if (launch.productionDomain) { const el = document.createElement("link"); el.rel = "canonical"; el.href = `https://${launch.productionDomain}${pathname}`; document.head.appendChild(el); }
    if (hash) { requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); } else { window.scrollTo(0, 0); }
  }, [pathname, hash]);
  return null;
}