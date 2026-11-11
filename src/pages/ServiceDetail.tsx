import { Link, useParams } from "react-router-dom";
import { ArrowDown, ArrowLeft, CircuitBoard, Gamepad2, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerContact from "./CustomerContact";
import { CustomerNotFound } from "./CustomerInfo";

const services = {
  microsoldering: {
    title: "Microsoldering", icon: CircuitBoard,
    intro: "Some faults need a closer look at the circuit board. Tell us what happened and we'll discuss whether board-level work could help.",
    heading: "A closer look at the fault.",
    description: "Microsoldering involves detailed work on small electronic components and connections. The right approach depends on the device, the fault and any previous repair work.",
    topics: ["Charging, USB, HDMI and audio socket faults", "Short circuits and no-power diagnosis", "Damaged pads, tracks and small components", "Liquid damage and corrosion assessment"],
    groups: [
      ["Ports & connectors", "Enquire about loose or damaged charging sockets, USB connections, HDMI ports and audio jacks."],
      ["Board-level faults", "Ask about short circuits, power faults and replacement of small components or integrated circuits."],
      ["Physical board damage", "Tell us about lifted pads, damaged tracks or broken connections, including damage from earlier repairs."],
      ["Liquid exposure", "We can discuss assessment of corrosion and affected board components. Let us know what happened and whether the device has been powered on since."],
    ],
    guidance: "Include the device model, when the problem started and whether it has had liquid exposure or previous repairs. Please leave it switched off if you suspect liquid damage.",
  },
  "computer-repairs": {
    title: "Laptop & computer repairs", icon: Laptop,
    intro: "A laptop that won't start, a desktop that's slowing down or a fault you can't pin down. Tell us what's happening and we'll help you work out the next step.",
    heading: "Help with your everyday computer.",
    description: "You can enquire about a laptop or desktop computer. Share the make and model and describe the issue, or tell us what you'd like to improve.",
    topics: ["Laptop screens, keyboards and batteries", "Charging, ports and starting-up faults", "SSD, hard-drive and RAM upgrades", "Software, cooling and performance issues"],
    groups: [
      ["Laptop hardware", "Enquire about damaged screens, worn batteries, faulty keyboards, charging sockets and other connections."],
      ["Desktop diagnosis & repairs", "Tell us about startup failures, display problems, unexpected shutdowns or faulty components in your PC."],
      ["Storage & memory upgrades", "Ask about SSD or hard-drive replacement, data cloning and RAM upgrades. We'll check what your model supports."],
      ["Cleaning & cooling", "Discuss fan problems, dust buildup, overheating and internal servicing for laptops or desktop computers."],
      ["Software & setup", "Enquire about Windows installation, driver issues, malware removal and performance problems. Any data backup or transfer requirements can be discussed first."],
      ["Liquid damage", "Contact us about a spill or signs of corrosion so we can discuss an assessment before attempting repairs."],
    ],
    guidance: "Include the make and model, any error messages and what you've already tried. For an upgrade, tell us how you use the computer and what you'd like to improve. Mention any important files you need to keep.",
  },
  "console-repairs": {
    title: "Games console repairs & upgrades", icon: Gamepad2,
    intro: "Get in touch about a console fault or an upgrade you're considering. We'll discuss the options for your model before any work is agreed.",
    heading: "Get back to your games.",
    description: "Describe the problem with your console, or tell us what you'd like to upgrade. Options depend on the model and the parts it supports.",
    topics: ["PlayStation, Xbox and Nintendo enquiries", "HDMI, charging, power and cooling faults", "Storage upgrades and system problems", "Controller stick drift, buttons and ports"],
    groups: [
      ["PlayStation & Xbox", "Ask about HDMI output, power faults, USB connections, disc-drive issues, fan problems and system startup errors. Include your exact console model."],
      ["Nintendo consoles", "Enquire about charging sockets, displays, batteries, game-card slots, cooling and connection problems on your Nintendo console."],
      ["Servicing & upgrades", "Discuss internal cleaning, cooling work, compatible storage upgrades or system software issues. Upgrade options vary by console."],
      ["Controller repairs", "Tell us about stick drift, worn thumbsticks, unresponsive buttons or triggers, charging ports, headphone sockets or vibration faults."],
      ["Controller upgrades", "Ask about replacement analogue sticks, calibration and compatible Hall Effect or TMR upgrades for your controller model."],
      ["Not sure what's wrong?", "Describe what happens when you turn it on or use it. Error messages, a model number and details of previous repairs will help us assess your enquiry."],
    ],
    guidance: "Include the console model, any error codes and when the fault occurs. For an upgrade, tell us what you're hoping to change. Don't include account passwords or sign-in codes.",
  },
};
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services[slug as keyof typeof services];
  if (!service) return <CustomerNotFound />;
  const Icon = service.icon;
  return <>
    <section className="page-intro"><div className="site-container">
      <Link to="/repairs" className="text-link inline-flex gap-2 items-center mb-6"><ArrowLeft size={16} /> All repair services</Link>
      <div className="max-w-3xl"><Icon size={36} className="text-primary mb-5" aria-hidden="true" /><h1>{service.title}</h1><p>{service.intro}</p>
        <Button asChild className="mt-6"><a href="#service-enquiry">Enquire about this service <ArrowDown /></a></Button>
      </div>
    </div></section>
    <section className="section-pad"><div className="site-container grid gap-8 lg:grid-cols-2 items-start">
      <div className="min-w-0"><h2>{service.heading}</h2><p className="mt-4 text-muted-foreground">{service.description}</p><h3 className="text-lg font-bold mt-8">What to tell us</h3><p className="mt-3 text-muted-foreground">{service.guidance}</p></div>
      <div className="min-w-0 rounded-xl border border-border bg-card p-6 sm:p-8"><h3 className="text-xl font-bold">Things you can ask us about</h3><ul className="mt-5 space-y-4">{service.topics.map(topic => <li key={topic} className="flex items-start gap-3"><span className="text-primary" aria-hidden="true">↗</span><span>{topic}</span></li>)}</ul><p className="small-note mt-6">We'll check what's possible for your device and confirm the price, parts and turnaround before you decide.</p></div>
    </div></section>
    <section className="section-pad bg-muted/40"><div className="site-container"><h2>Repairs & upgrades to enquire about.</h2><p className="text-muted-foreground mt-4 max-w-3xl">Choose the area closest to your issue. We'll confirm the work available for your particular device after discussing the fault.</p><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">{service.groups.map(([title, text]) => <article key={title} className="min-w-0 rounded-xl border border-border bg-card p-6 flex flex-col"><h3 className="text-xl font-bold">{title}</h3><p className="text-muted-foreground mt-4 flex-1">{text}</p><a className="text-link inline-flex items-center gap-2 mt-5" href="#service-enquiry">Ask us about this <ArrowDown size={16} className="shrink-0" /></a></article>)}</div></div></section>
    <section className="process-band"><div className="site-container"><h2>Tell us. Get advice. Decide.</h2><div className="grid gap-6 md:grid-cols-3 mt-8">{[["01", "Describe the issue", "Use the form below, or message us on WhatsApp with your device details."], ["02", "Discuss the options", "We'll let you know if an assessment is needed and explain the next steps."], ["03", "Agree the work", "You'll receive the details of the proposed work and quote before going ahead."]].map(([n,title,text]) => <div key={n} className="min-w-0"><span className="text-sm font-bold">{n}</span><h3 className="text-xl font-bold mt-3">{title}</h3><p className="mt-3">{text}</p></div>)}</div></div></section>
    <CustomerContact key={slug} service={service.title} />
  </>;
}
