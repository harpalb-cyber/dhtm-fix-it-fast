import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageIntro, ShopLocation } from "@/components/customer/Shared";
import { emailDraftUrl, enquiryErrors, phoneUrl, business } from "@/lib/customer-services";

export default function CustomerContact({ sell = false }: { sell?: boolean }) {
  const [params] = useSearchParams();
  const context = params.get("context") || "";
  const [fields, setFields] = useState({ name: "", email: "", message: context ? `Please quote for: ${context}` : "" });
  const [device, setDevice] = useState({ brand: "", model: "", condition: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [deviceError, setDeviceError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next = enquiryErrors(fields); setErrors(next);
    const missingDevice = sell && (!device.brand.trim() || !device.model.trim() || !device.condition);
    setDeviceError(missingDevice ? "Please enter your brand, model and condition." : "");
    if (Object.values(next).some(Boolean) || missingDevice) return;
    const body = `Name: ${fields.name.trim()}\nReply email: ${fields.email.trim()}\n${sell ? `Device: ${device.brand} ${device.model}\nCondition: ${device.condition}\n` : ""}\n${fields.message.trim()}\n\nPlease confirm availability and arrangements. No appointment or purchase is reserved.`;
    window.location.href = emailDraftUrl(sell ? "Sell my device enquiry" : "DHT repair / shop enquiry", body);
  }
  function update(key: keyof typeof fields, value: string) { setFields({ ...fields, [key]: value }); setErrors({ ...errors, [key]: "" }); }
  return <><PageIntro title={sell ? "Sell your device." : "Contact DHT Mobiles."} description={sell ? "Tell DHT about your device. Online valuations are coming soon; manual enquiries are welcome." : "Find us in Littleover, give us a call or prepare an email enquiry."} /><section className="section-pad"><div className="site-container two-column contact-layout"><div id="book"><h2>{sell ? "Tell us about your device." : "What can we help with?"}</h2>{context && <div className="enquiry-context"><strong>Your repair enquiry</strong><p>{context}</p><Link to={`/repairs?${new URLSearchParams({ brand: context.split(" ")[0] }).toString()}`} className="text-link">Back to repair selection ↗</Link></div>}<p className="form-explanation">This opens an email draft in your email app. Review it and send it yourself. Nothing is submitted or reserved on this website.</p><form onSubmit={submit} noValidate><div className="form-grid">{(["name", "email"] as const).map(key => <div key={key}><label htmlFor={key}>{key === "name" ? "Name" : "Email"}</label><Input id={key} type={key === "email" ? "email" : "text"} autoComplete={key} value={fields[key]} onChange={e => update(key, e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]}</p>}</div>)}</div>{sell && <div className="sell-fields"><label htmlFor="sell-brand">Device brand</label><Input id="sell-brand" value={device.brand} onChange={e => setDevice({ ...device, brand: e.target.value })} placeholder="e.g. Apple or Samsung" aria-describedby={deviceError ? "device-error" : undefined} /><label htmlFor="sell-model">Device model</label><Input id="sell-model" value={device.model} onChange={e => setDevice({ ...device, model: e.target.value })} placeholder="Include storage if you know it" /><label htmlFor="sell-condition">Condition</label><select id="sell-condition" value={device.condition} onChange={e => setDevice({ ...device, condition: e.target.value })}><option value="">Choose condition</option><option>Working, excellent</option><option>Working, some wear</option><option>Damaged or faulty</option><option>Not sure</option></select>{deviceError && <p id="device-error" className="field-error">{deviceError}</p>}</div>}<label htmlFor="message">{sell ? "Anything else DHT should know?" : "Your message"}</label><textarea id="message" rows={6} value={fields.message} onChange={e => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-help"} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}<p className="small-note" id="message-help">Please don’t include passwords, device passcodes or payment details. {sell ? "An enquiry does not commit you to selling." : "For an urgent repair enquiry, call the shop."}</p><Button type="submit"><Mail />Open email draft</Button><p className="small-note">No email app? Call <a className="text-link" href={phoneUrl}>{business.phone}</a> or email {business.email} from your usual email service.</p><p className="small-note">See our <Link className="text-link" to="/privacy">privacy information</Link>. Your details stay in this page until you open your email app; this website does not send or store your enquiry.</p></form></div><ShopLocation /></div></section></>;
}
