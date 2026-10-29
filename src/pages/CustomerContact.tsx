import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageIntro, ShopLocation, WhatsAppButton } from "@/components/customer/Shared";
import { enquiryErrors, phoneUrl, business } from "@/lib/customer-services";
import { submitEnquiry } from "@/lib/live-data";

export default function CustomerContact({ sell = false }: { sell?: boolean }) {
  const [params] = useSearchParams();
  const context = (params.get("context") || "").slice(0, 500);
  const savedReturn = params.get("return");
  const returnPath = savedReturn?.startsWith("/repairs?") ? savedReturn : "/repairs";
  const [fields, setFields] = useState({ name: "", email: "", message: context ? `Please quote for: ${context}` : "" });
  const [phone, setPhone] = useState("");
  const [device, setDevice] = useState({ brand: "", model: "", condition: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [deviceError, setDeviceError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = enquiryErrors(fields); setErrors(next);
    const missingDevice = sell && (!device.brand.trim() || !device.model.trim() || !device.condition);
    setDeviceError(missingDevice ? "Please enter your brand, model and condition." : "");
    if (Object.values(next).some(Boolean) || missingDevice) return;
    setStatus("sending");
    try {
      await submitEnquiry({ kind: sell ? "sell" : context ? "repair" : "contact", ...fields, phone, context, device: sell ? `${device.brand} ${device.model}` : "", device_condition: sell ? device.condition : "" });
      setStatus("sent");
    } catch { setStatus("error"); }
  }
  function update(key: keyof typeof fields, value: string) { setFields({ ...fields, [key]: value }); setErrors({ ...errors, [key]: "" }); }
  const waText = sell ? "Hi DHT, I'd like to sell my device." : context ? `Hi DHT, please quote for: ${context}` : undefined;
  return <><PageIntro title={sell ? "Sell your device." : "Contact DHT Mobiles."} description={sell ? "Tell DHT about your device and we'll get back to you with an offer." : "Message us on WhatsApp, give us a call or send us a message below."} /><section className="section-pad"><div className="site-container two-column contact-layout"><div id="book"><div className="whatsapp-panel"><div><strong>Prefer WhatsApp?</strong><p>Send us a message and we’ll get back to you.</p></div><WhatsAppButton text={waText} /></div><h2>{sell ? "Tell us about your device." : "What can we help with?"}</h2>{context && <div className="enquiry-context"><strong>Your repair enquiry</strong><p>{context}</p><Link to={returnPath} className="text-link">Back to repair selection ↗</Link></div>}
    {status === "sent" ? <div className="form-success" role="status"><CheckCircle2 size={32} /><h3>Thanks — your message has been sent.</h3><p>DHT will get back to you by email{phone ? " or phone" : ""}. Nothing is booked or reserved until the shop confirms with you.</p><Button variant="outline" onClick={() => { setStatus("idle"); setFields({ name: "", email: "", message: "" }); setPhone(""); setDevice({ brand: "", model: "", condition: "" }); }}>Send another message</Button></div> :
    <form onSubmit={submit} noValidate><div className="form-grid">{(["name", "email"] as const).map(key => <div key={key}><label htmlFor={key}>{key === "name" ? "Name" : "Email"}</label><Input id={key} maxLength={key === "name" ? 100 : 255} type={key === "email" ? "email" : "text"} autoComplete={key} value={fields[key]} onChange={e => update(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>)}</div><label htmlFor="phone">Phone (optional)</label><Input id="phone" type="tel" autoComplete="tel" maxLength={30} value={phone} onChange={e => setPhone(e.target.value)} />{sell && <div className="sell-fields"><label htmlFor="sell-brand">Device brand</label><Input id="sell-brand" maxLength={60} value={device.brand} onChange={e => setDevice({ ...device, brand: e.target.value })} placeholder="e.g. Apple or Samsung" aria-describedby={deviceError ? "device-error" : undefined} /><label htmlFor="sell-model">Device model</label><Input id="sell-model" maxLength={120} value={device.model} onChange={e => setDevice({ ...device, model: e.target.value })} placeholder="Include storage if you know it" /><label htmlFor="sell-condition">Condition</label><select id="sell-condition" value={device.condition} onChange={e => setDevice({ ...device, condition: e.target.value })}><option value="">Choose condition</option><option>Working, excellent</option><option>Working, some wear</option><option>Damaged or faulty</option><option>Not sure</option></select>{deviceError && <p id="device-error" className="field-error">{deviceError}</p>}</div>}<label htmlFor="message">{sell ? "Anything else DHT should know?" : "Your message"}</label><textarea id="message" rows={6} maxLength={2000} value={fields.message} onChange={e => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-help"} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}<p className="small-note" id="message-help">Please don’t include passwords, device passcodes or payment details. {sell ? "An enquiry does not commit you to selling." : "For an urgent repair, call or WhatsApp the shop."}</p>{status === "error" && <p className="field-error" role="alert">Sorry, your message couldn’t be sent. Please try again, WhatsApp us or call <a className="text-link" href={phoneUrl}>{business.phone}</a>.</p>}<Button type="submit" disabled={status === "sending"}>{status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}{status === "sending" ? "Sending…" : "Send message"}</Button><p className="small-note">See our <Link className="text-link" to="/privacy">privacy information</Link>. Your details are only used to reply to your enquiry.</p></form>}</div><ShopLocation /></div></section></>;
}
