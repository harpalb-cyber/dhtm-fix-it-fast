import { useEffect, useRef, useState } from "react";
import { Palette, Check, X } from "lucide-react";
import { whatsappUrl } from "@/lib/customer-services";

type Theme = "current" | "rounded";
export function readTheme(): Theme {
  try { return localStorage.getItem("dht-theme") === "rounded" ? "rounded" : "current"; } catch { return "current"; }
}
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("dht-theme", theme); } catch { /* Theme still works when storage is unavailable. */ }
  }, [theme]);
  useEffect(() => {
    function outside(e: PointerEvent) { if (!panel.current?.contains(e.target as Node)) setOpen(false); }
    function sync(e: StorageEvent) { if (e.key === "dht-theme") setTheme(readTheme()); }
    document.addEventListener("pointerdown", outside); window.addEventListener("storage", sync);
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("storage", sync); };
  }, []);
  return <>
    <div className="theme-control" ref={panel} onKeyDown={e => { if(e.key === "Escape") { setOpen(false); panel.current?.querySelector('button')?.focus(); } }}>
      <button type="button" className="theme-trigger" aria-label="Choose website theme" aria-expanded={open} aria-controls="theme-options" onClick={() => setOpen(!open)}><Palette size={19} /><span>Theme</span></button>
      {open && <div className="theme-options" id="theme-options"><div className="theme-options-heading"><strong>Website theme</strong><button type="button" aria-label="Close theme options" onClick={() => setOpen(false)}><X size={18}/></button></div><p>Choose a look for this browser.</p>{([['current','Current','Original DHT design'],['rounded','Rounded Tech','Soft blue cards & rounded type']] as const).map(([value,title,description]) => <button type="button" className="theme-choice" key={value} aria-pressed={theme === value} onClick={() => setTheme(value)}><span><strong>{title}</strong><small>{description}</small></span>{theme === value && <Check size={18} aria-hidden="true" />}</button>)}</div>}
    </div>
    {theme === "rounded" && <a className="floating-whatsapp" href={whatsappUrl("Hi DHT Mobiles, I'd like to ask about a repair.")} target="_blank" rel="noreferrer"><span><img src="/assets/whatsapp.svg" width="24" height="24" alt="" /></span>Chat with DHT</a>}
  </>;
}
