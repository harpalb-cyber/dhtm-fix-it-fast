import RepairOption from "@/components/customer/RepairOption";
import { qualityFor, pricedRepair, repairPrice, repairQualities } from "@/lib/repair-quality";
import RepairChoice from "@/components/customer/RepairChoice";
import AdditionalServices from "@/components/customer/AdditionalServices";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadDeviceWithPrices } from "@/lib/live-data";
import { Link, useSearchParams } from "react-router-dom";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import taxonomy from "@/data/model-taxonomy-reference.json";
import { Button } from "@/components/ui/button";
import { Artwork, brandNames, PageIntro } from "@/components/customer/Shared";
import { Device, estimateRepairs, formatMoney } from "@/lib/customer-services";

const devices: Device[] = taxonomy.devices;
const families = [["phone", "Phone"], ["tablet", "Tablet"], ["laptop", "Laptop"], ["watch", "Watch"]];
export default function Repairs() {
  const [params, setParams] = useSearchParams();
  const scrollAfterModel = useRef(false);
  const [modelSelection, setModelSelection] = useState(0);
  const brand = params.get("brand") || "Apple";
  const kind = params.get("family") || "phone";
  const modelId = params.get("model") || "";
  const selectedIds = (params.get("repairs") || "").split(",").filter(Boolean);
  const [repairFilter, setRepairFilter] = useState("all");
  const available = useMemo(() => devices.filter(d => d.brand.toLowerCase() === brand.toLowerCase() && d.kind === kind), [brand, kind]);
  const baseModel = available.find(d => d.id === modelId);
  const priced = useQuery({ queryKey: ["device-prices", baseModel?.id], queryFn: () => loadDeviceWithPrices(baseModel!), enabled: Boolean(baseModel) });
  const sourceModel = baseModel ? priced.data || baseModel : undefined;
  const model = sourceModel ? { ...sourceModel, repairs: sourceModel.repairs.map(r => pricedRepair(r, qualityFor(r.id, params.get(`quality-${r.id}`)))) } : undefined;
  const selected = model?.repairs.filter(r => selectedIds.includes(r.id)) || [];
  const estimate = estimateRepairs(selected);
  useEffect(() => {
    if (!scrollAfterModel.current || !modelId) return;
    scrollAfterModel.current = false;
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById("repair-options-heading");
      section?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      section?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [modelId, modelSelection]);
  function changeDevice(key: string, value: string) {
    scrollAfterModel.current = key === "model";
    if (key === "model") setModelSelection(count => count + 1);
    const next = new URLSearchParams(params); next.set(key, value); next.delete("repairs");
    Object.keys(repairQualities).forEach(id => next.delete(`quality-${id}`));
    if (key !== "model") next.delete("model");
    setParams(next); setRepairFilter("all");
  }
  function toggleRepair(id: string) {
    const next = new URLSearchParams(params);
    const ids = selectedIds.includes(id) ? selectedIds.filter(x => x !== id) : [...selectedIds, id];
    if (ids.length) next.set("repairs", ids.join(",")); else next.delete("repairs");
    setParams(next);
  }
  function changeQuality(id: string, quality: string) {
    const next = new URLSearchParams(params); next.set(`quality-${id}`, quality);
    const ids = selectedIds.includes(id) ? selectedIds : [...selectedIds, id]; next.set("repairs", ids.join(",")); setParams(next);
  }
  const context = model ? `${model.brand} ${model.displayName}${selected.length ? ` — ${selected.map(r => `${r.name}${r.quality ? ` (${r.quality})` : r.isFree ? " (Free)" : ""}`).join(", ")}` : ""}` : "";
  return <><PageIntro title="Find your repair." description="Choose your brand, device and model. Ask DHT to confirm repair availability and a quote." /><section className="section-pad"><div className="site-container repair-layout"><div className="repair-form"><div className="repair-picker-intro"><span className="repair-eyebrow">Let's find your device</span><h2>Three choices. Your repair.</h2><p>Start with the brand, then choose your device and model.</p></div><div className="repair-choice-grid">
<RepairChoice step="01" title="Choose your brand" hint="Who made your device?" value={brand} options={brandNames.map(name => ({ value:name, label:name, art:name.toLowerCase() }))} onChange={value => changeDevice("brand",value)} />
<RepairChoice step="02" title="Choose your device" hint="What are we looking at?" value={kind} options={families.map(([value,label]) => ({value,label,art:`device-${value}`}))} onChange={value => changeDevice("family",value)} />
<RepairChoice step="03" title="Choose your model" hint="Find the name or model number." value={model?.id || ""} options={available.map(d => ({value:d.id,label:d.modelLabel,keywords:d.modelCodes.join(" ")}))} onChange={value => changeDevice("model",value)} />
</div><p className="breadcrumb" aria-label="Your selection"><strong>{brand}</strong><span>›</span><strong>{families.find(([v]) => v === kind)?.[1]}</strong><span>›</span><strong>{model?.modelLabel || "Choose your model"}</strong></p><details className="model-help"><summary>Not sure which model you have?</summary><p>On a phone or tablet, look in Settings → About. For a laptop or watch, check its settings or the label on the device. You can share the model number with DHT — never send your device passcode.</p><Link className="text-link" to="/contact#book">Ask for model help ↗</Link></details><div className="section-heading repair-heading"><h2 id="repair-options-heading" tabIndex={-1} className="scroll-mt-28">What needs repairing?</h2><Button variant="ghost" size="icon" title="Reset selections" aria-label="Reset selections" onClick={() => { setParams({ brand: "Apple", family: "phone" }); setRepairFilter("all"); }}><RotateCcw /></Button></div><p className="small-note">Choose the repairs and part quality you would like. Fault diagnosis is free for all devices; replacement parts are quoted before work begins.</p>{model ? <><div className="repair-filter-chips" role="group" aria-label="Filter repair enquiries"><button type="button" aria-pressed={repairFilter === "all"} onClick={() => setRepairFilter("all")}>All repairs</button>{model.repairs.map(r => <button type="button" key={r.id} aria-pressed={repairFilter === r.id} onClick={() => setRepairFilter(r.id)}>{r.name}</button>)}</div><div className="repair-options">{model.repairs.filter(r => repairFilter === "all" || r.id === repairFilter).map(r => <RepairOption key={r.id} repair={r} selected={selectedIds.includes(r.id)} quality={r.quality} onToggle={() => toggleRepair(r.id)} onQuality={q => changeQuality(r.id,q)} />)}</div></> : <div className="empty-state compact-empty"><Artwork name={`device-${kind}`} /><h3>Choose your model to continue.</h3><p>{available.length ? "Select a model above to tell us what needs attention." : "No models are listed for this combination. DHT can help identify your device and check service availability."}</p></div>}<Button asChild disabled={!model || !selected.length} className={!model || !selected.length ? "pointer-events-none opacity-50" : ""}><Link aria-disabled={!model || !selected.length} tabIndex={!model || !selected.length ? -1 : undefined} to={`/contact?context=${encodeURIComponent(context)}&return=${encodeURIComponent(`/repairs?${params.toString()}`)}#book`}>Enquire about this repair <ArrowUpRight /></Link></Button><p className="small-note">No appointment is reserved. Your quote and visit are agreed with DHT.</p><Link className="text-link" to="/contact#book">Can’t find your device? Ask for a quote ↗</Link></div><aside className="estimate-panel" aria-live="polite"><h2>Your repair estimate</h2><div className="estimate-device"><Artwork name={`device-${kind}`} /><div><small>{brand} · {families.find(([v]) => v === kind)?.[1]}</small><strong>{model?.modelLabel || "Choose your model"}</strong></div></div>{selected.length > 0 && <ul className="estimate-items">{selected.map(r => <li key={r.id}><span>{r.name}{r.quality && <small className="block">{r.quality}</small>}</span><strong>{repairPrice(r)}</strong></li>)}</ul>}<div className="estimate-total"><span>Estimate</span><strong>{!selected.length ? "Not selected" : estimate.requiresQuote ? "Final total requires a quote" : estimate.knownPence === 0 ? "Free" : formatMoney(estimate.knownPence)}</strong>{estimate.requiresQuote && estimate.knownPence > 0 && <small>Known items: {formatMoney(estimate.knownPence)}</small>}</div><p>Final price, part specifications and turnaround are confirmed with the shop after assessment.</p><p className="estimate-note">This is a repair enquiry, not a confirmed booking. No online payment is taken.</p>{selected.length > 0 && <Button className="w-full" asChild><Link to={`/contact?context=${encodeURIComponent(context)}&return=${encodeURIComponent(`/repairs?${params.toString()}`)}#book`}>Ask DHT for a quote <ArrowUpRight /></Link></Button>}</aside></div></section><AdditionalServices /></>;
}
