import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Artwork, WhatsAppButton } from "@/components/customer/Shared";

const links = [["Repairs", "/repairs"], ["Shop", "/shop"], ["Sell your device", "/sell"], ["Postal repairs", "/postal-repairs"], ["Training", "/training/mobile-phone-repair-course"], ["Contact", "/contact"]];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <><a className="skip-link" href="#main-content">Skip to content</a><header className="site-header"><div className="site-container header-inner"><Link to="/" aria-label="DHT Mobiles home"><Artwork name="logo" alt="DHT Mobiles" className="site-logo" /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([name, path]) => <NavLink key={path} to={path}>{name}</NavLink>)}</nav><Button asChild className="header-cta"><Link to="/repairs">Find my repair <ArrowUpRight /></Link></Button><div className="mobile-menu"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open navigation" aria-expanded={open}><Menu /></Button></SheetTrigger><SheetContent className="menu-panel"><SheetTitle className="sr-only">Menu</SheetTitle><SheetDescription className="sr-only">DHT Mobiles navigation</SheetDescription><Link to="/" onClick={() => setOpen(false)} aria-label="DHT Mobiles home"><Artwork name="logo" alt="DHT Mobiles" className="menu-logo" /></Link><nav aria-label="Mobile navigation" className="menu-links">{links.map(([name, path]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{name}<ArrowUpRight size={18} /></NavLink>)}</nav><Button asChild><Link to="/repairs" onClick={() => setOpen(false)}>Find my repair <ArrowUpRight /></Link></Button><Button asChild variant="outline"><Link to="/sell" onClick={() => setOpen(false)}>Sell your device</Link></Button><WhatsAppButton className="w-full" /></SheetContent></Sheet></div></div></header></>;
}
