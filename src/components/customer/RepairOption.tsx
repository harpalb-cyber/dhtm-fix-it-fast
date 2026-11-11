import { Checkbox } from "@/components/ui/checkbox";
import { repairPrice, repairQualities } from "@/lib/repair-quality";
import type { RepairItem } from "@/lib/customer-services";
export default function RepairOption({ repair, selected, quality, onToggle, onQuality }: { repair: RepairItem & {isFree?:boolean}; selected:boolean; quality:string; onToggle:()=>void; onQuality:(quality:string)=>void }) {
  const qualities = repairQualities[repair.id];
  return <div className={`repair-option quality-repair ${selected ? "is-selected" : ""}`}>
    <label className="repair-option-main"><Checkbox checked={selected} onCheckedChange={onToggle} aria-label={repair.name}/><span><strong>{repair.name}</strong><small>{repair.id === "diagnostic" ? "Free for all devices" : "Select to add to your enquiry"}</small></span></label>
    <strong className="quality-price" aria-live="polite">{repairPrice(repair)}</strong>
    {qualities && <fieldset className="quality-options"><legend>Choose {repair.id === "screen" ? "screen type" : "part quality"}</legend><div>{qualities.map(q => <label key={q} className={quality === q ? "is-selected" : ""}><input type="radio" name={`quality-${repair.id}`} value={q} checked={quality === q} onChange={() => onQuality(q)}/><span>{q}</span></label>)}</div></fieldset>}
  </div>;
}
