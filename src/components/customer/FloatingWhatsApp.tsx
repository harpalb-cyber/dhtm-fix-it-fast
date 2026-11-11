import { whatsappUrl } from "@/lib/customer-services";

export default function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappUrl("Hi DHT Mobiles, I'd like to ask about a repair.")} target="_blank" rel="noreferrer"><span><img src="/assets/whatsapp.svg" width="24" height="24" alt="" /></span>Chat with DHT</a>;
}
