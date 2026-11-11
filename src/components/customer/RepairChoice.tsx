import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Artwork } from "./Shared";

type Option = { value: string; label: string; keywords?: string; art?: string };
export default function RepairChoice({ step, title, hint, value, options, onChange }: { step: string; title: string; hint: string; value: string; options: Option[] } & { onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const chosen = options.find(o => o.value === value);
  return <div className="repair-choice"><div className="repair-choice-heading"><span>{step}</span><label id={`choice-label-${step}`}>{title}</label></div><p>{hint}</p>
    <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><button type="button" className={`repair-choice-trigger ${chosen ? "has-choice" : ""}`} aria-label={`${title}: ${chosen?.label || "Choose your model"}`} aria-expanded={open}>
      {chosen?.art && <Artwork name={chosen.art} />}<strong>{chosen?.label || "Choose your model"}</strong><ChevronDown size={18} aria-hidden="true" />
    </button></PopoverTrigger><PopoverContent className="repair-choice-popup" align="start" sideOffset={8}>
      <Command><CommandInput aria-label={`Search ${title.toLowerCase()}`} placeholder={`Search ${title.toLowerCase()}…`} /><CommandList><CommandEmpty>No matches. Try another search.</CommandEmpty><CommandGroup>{options.map(option => <CommandItem key={option.value} value={`${option.label} ${option.keywords || ""}`} onSelect={() => { onChange(option.value); setOpen(false); }} className="repair-choice-option">
        {option.art && <Artwork name={option.art} />}<span>{option.label}</span>{option.value === value && <Check size={18} className="text-primary ml-auto" aria-hidden="true" />}
      </CommandItem>)}</CommandGroup></CommandList></Command>
      {!options.length && <p className="small-note px-4 pb-3">Try another brand or device type, or ask the shop for help.</p>}
    </PopoverContent></Popover>
  </div>;
}
