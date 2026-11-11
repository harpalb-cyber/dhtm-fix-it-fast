import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, ArrowUpRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Artwork, WhatsAppButton } from "@/components/customer/Shared";

const links = [
  { name: "Repairs", path: "/repairs", sections: [["iPhone repairs", "/repairs?brand=Apple&family=phone"], ["Samsung repairs", "/repairs?brand=Samsung&family=phone"], ["Google repairs", "/repairs?brand=Google&family=phone"], ["Microsoldering", "/services/microsoldering"], ["Laptop & computer repairs", "/services/computer-repairs"], ["Gaming consoles & controllers", "/services/console-repairs"], ["Ask for a repair update", "/track-repair"]] },
  { name: "Shop", path: "/shop", sections: [["All products", "/shop"], ["Phones", "/shop?category=phones"], ["Tablets", "/shop?category=tablets"], ["Chargers", "/shop?category=chargers"], ["Cases & accessories", "/shop?category=accessories"]] },
  { name: "Sell your device", path: "/sell", sections: [["Sell a phone or device", "/sell"], ["Your device details", "/sell#sell-device-details"], ["Add device photos", "/sell#device-photos"]] },
  { name: "Postal repairs", path: "/postal-repairs", sections: [["How postal repairs work", "/postal-repairs"], ["Packing & postage", "/postal-repairs#postal-steps"], ["Arrange a postal repair", "/contact?context=Postal%20repair#book"]] },
  { name: "Training", path: "/training/mobile-phone-repair-course", sections: [["About the course", "/training/mobile-phone-repair-course"], ["Course content", "/training/mobile-phone-repair-course#course-content"], ["Training enquiry", "/training/mobile-phone-repair-course#training-enquiry"]] },
  { name: "Contact", path: "/contact", sections: [["Send an enquiry", "/contact#book"], ["Find the shop & opening hours", "/contact#shop-location"], ["Customer help", "/help"], ["About DHT", "/about"]] },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const location = useLocation();
  function close() { setOpen(false); setExpanded(null); }
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="site-container header-inner"><Link to="/" aria-label="DHT Mobiles home" onClick={close}><Artwork name="logo" alt="DHT Mobiles" className="site-logo" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(({name,path,sections},i) => <div className="nav-group" key={path} onMouseEnter={() => setExpanded(path)} onMouseLeave={() => setExpanded(null)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(null); }} onKeyDown={e => { if (e.key === "Escape") { setExpanded(null); e.currentTarget.querySelector('button')?.focus(); } }}>
      <div className="nav-parent"><NavLink to={path} onClick={close} className={path === "/repairs" && location.pathname.startsWith("/services/") ? "active" : undefined}>{name}</NavLink><button type="button" className="nav-toggle" aria-label={`${name} sections`} aria-expanded={expanded === path} aria-controls={`nav-sections-${i}`} onClick={() => setExpanded(path)}><ChevronDown size={12} /></button></div>
      <div className="nav-dropdown" id={`nav-sections-${i}`} hidden={expanded !== path}><div className="nav-dropdown-inner">{sections.map(([label,url]) => <Link key={url} to={url} onClick={close}>{label}<ArrowUpRight size={14} /></Link>)}</div></div>
    </div>)}</nav>
    <Button asChild className="header-cta"><Link to="/repairs">Find my repair <ArrowUpRight /></Link></Button><div className="mobile-menu"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open navigation" aria-expanded={open}><Menu /></Button></SheetTrigger><SheetContent className="menu-panel"><SheetTitle className="sr-only">Menu</SheetTitle><SheetDescription className="sr-only">DHT Mobiles navigation</SheetDescription><Link to="/" onClick={close} aria-label="DHT Mobiles home"><Artwork name="logo" alt="DHT Mobiles" className="menu-logo" /></Link><nav aria-label="Mobile navigation" className="menu-links">{links.map(({name,path,sections},i) => <div key={path}><div className="mobile-nav-parent"><NavLink to={path} onClick={close}>{name}</NavLink><button type="button" aria-label={`${name} sections`} aria-expanded={expanded === path} aria-controls={`mobile-sections-${i}`} onClick={() => setExpanded(expanded === path ? null : path)}><ChevronDown size={18} /></button></div><div className="mobile-subnav" id={`mobile-sections-${i}`} hidden={expanded !== path}>{sections.map(([label,url]) => <Link to={url} key={url} onClick={close}>{label}<ArrowUpRight size={14}/></Link>)}</div></div>)}</nav><Button asChild><Link to="/repairs" onClick={close}>Find my repair <ArrowUpRight /></Link></Button><WhatsAppButton className="w-full" /></SheetContent></Sheet></div></div></header></>;
}
