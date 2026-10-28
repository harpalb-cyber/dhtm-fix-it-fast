import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Users, Wrench, BadgeCheck, ShieldCheck, Smartphone, Battery, Plug, Search, RotateCcw, Layers, CheckCircle2, Loader2, Send, Phone, Award, GraduationCap, Hammer, Lightbulb, Store, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ShopLocation, WhatsAppButton } from "@/components/customer/Shared";
import { phoneUrl, business } from "@/lib/customer-services";
import { submitEnquiry } from "@/lib/live-data";
import { trainingCourse, trainingErrors, trainingMessage, type TrainingForm } from "@/lib/training-course";
import heroImg from "@/assets/hero-repair.jpg";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const Eyebrow = ({ children }: { children: string }) => <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase mb-3">{children}</p>;
const card = "rounded-lg border border-border bg-card p-6";

const facts = [[CalendarDays, "Sunday Sessions"], [Clock, "10am–3pm"], [Users, "Maximum 2 Students"], [Wrench, "Equipment Provided"], [ShieldCheck, "Ages 18+"]] as const;
const topics = [
  [Layers, "Phone Components & Disassembly", "Understand the basic components inside an iPhone or Samsung smartphone, how they connect and how to open devices carefully."],
  [Smartphone, "Screen Replacement", "Learn the process behind removing a damaged display, understanding its connections and fitting a replacement screen on suitable training devices."],
  [Battery, "Battery Replacement", "Understand smartphone battery safety, how batteries are secured and the important precautions involved in removal and replacement."],
  [Plug, "Charging-Port Repairs", "Explore how charging problems are diagnosed, common charging-port issues and replacement techniques on suitable models."],
  [Search, "Fault Finding & Diagnosis", "Learn how to approach common problems, recognise likely causes and identify when a repair may need more advanced expertise."],
  [RotateCcw, "Reassembly & Testing", "Practise careful reassembly and learn how technicians check a phone's essential functions after a repair."],
] as const;
const timeline = [
  ["10:00–10:20", "Welcome, Workshop Safety & Setup", "Meet your trainer, understand your workstation and learn the essentials of ESD protection, lithium-ion battery precautions, tool safety and handling components."],
  ["10:20–11:00", "Tools & Phone Anatomy", "Explore repair tools, device construction, common components, screws, adhesives, connectors and flex cables."],
  ["11:00–12:10", "Opening Phones & Screens", "See how suitable devices are opened, learn safe disassembly methods and work through screen removal and replacement principles."],
  ["12:10–12:30", "Break", "A short pause before the afternoon practical sessions."],
  ["12:30–1:25", "Battery Repairs", "Understand battery safety, adhesive removal and the basic procedures involved in battery replacement, using suitable practice devices."],
  ["1:25–2:15", "Charging Ports & Common Faults", "Explore charging-port issues, basic fault finding and how technicians decide whether a component needs replacing."],
  ["2:15–2:50", "Reassembly, Testing & Practice", "Bring the day's learning together through supervised practical work and testing."],
  ["2:50–3:00", "Review & Completion", "Ask final questions, discuss next steps and receive your DHT Mobiles Certificate of Completion after completing the course."],
];
const audiences = [
  [Lightbulb, "Complete Beginners", "Curious about electronics? Start with the tools, parts and techniques behind common smartphone repairs."],
  [Hammer, "DIY Repair Enthusiasts", "Build your understanding and learn safer, more methodical ways to approach basic repairs."],
  [GraduationCap, "Career Explorers", "Get a practical introduction to mobile phone repair before deciding whether to develop your skills further."],
  [Store, "Aspiring Repair Business Owners", "Explore the technical foundations of everyday repairs before investing in additional training, equipment and business setup."],
] as const;
const included = ["Repair tools and workstation equipment during training", "Suitable iPhone and Samsung practice devices", "Demonstrations and supervised practical exercises", "Guidance from an experienced repair technician", "DHT Mobiles Certificate of Completion"];
const details = ["Sundays, 10am–3pm", "At DHT Mobiles, Littleover, Derby", "Maximum 2 students per session", "iPhone and Samsung repair fundamentals", "All training equipment provided", "DHT Certificate of Completion", "Minimum age 18"];
const faqs = [
  ["Do I need previous experience?", "No. The course is designed for complete beginners. We'll start with the tools, parts and basic safety procedures before moving on to practical exercises."],
  ["What phones will we work on?", "The course covers the fundamentals of Apple iPhone and Samsung smartphone repairs. DHT provides suitable training devices, and the exact models used may vary."],
  ["What repairs will I learn?", "You'll be introduced to screen replacements, battery replacements, charging-port repairs, disassembly, reassembly and basic fault finding. The course combines demonstrations and supervised practice, with activities matched to the devices and time available."],
  ["How long is the course?", "The course is one day, running on Sundays from 10am to 3pm. We'll confirm an available Sunday with you before you book."],
  ["How many people attend?", "We limit the course to a maximum of two students so we can give you more focused guidance during the practical activities."],
  ["Do I need to bring tools or a phone?", "No. We provide all the tools, equipment and practice phones needed during the session."],
  ["Can I bring my own damaged phone?", "Yes, you can bring a personal phone for consideration, but any practical work on it is optional and subject to the technician approving it as safe and suitable. Repairs are not guaranteed. Back up important data beforehand, and be aware that opening or working on a phone involves a risk of damage or data loss."],
  ["Will I get a certificate?", "Yes. When you complete the training, you'll receive a DHT Mobiles Certificate of Completion. This is issued by DHT and is not an externally accredited qualification."],
  ["How much does the course cost?", "Contact us for the current price. We'll explain the full cost, deposit, balance payment arrangements and relevant terms before you commit."],
  ["Do I pay everything upfront?", "No. We arrange a deposit to confirm your place, followed by the remaining balance. The amounts and payment deadlines will be agreed before payment."],
  ["Can I start repairing phones professionally afterwards?", "The course is a starting point. You'll learn beginner-level skills and become familiar with basic repair procedures, but becoming a professional technician requires further practice, experience and sometimes additional specialist training."],
  ["Are there any age restrictions?", "Yes. You must be at least 18 years old to attend."],
  ["Where is the course held?", "At DHT Mobiles in Littleover, Derby. We'll provide the full location and arrival details when your place is confirmed."],
  ["Is microsoldering included?", "No. Advanced motherboard repairs and microsoldering are outside the scope of this beginner course."],
  ["Can I cancel or rearrange my training?", "Contact DHT Mobiles as soon as possible. The applicable cancellation, rearrangement and refund terms will be explained before you pay a deposit."],
];

function CourseSchema() {
  useEffect(() => {
    const el = document.createElement("script"); el.type = "application/ld+json"; el.id = "course-schema";
    el.text = JSON.stringify({ "@context": "https://schema.org", "@type": "Course", name: trainingCourse.title, description: "One-day, in-person beginner iPhone and Samsung phone repair training in Littleover, Derby.", educationalLevel: "Beginner", provider: { "@type": "Organization", name: "DHT Mobiles" }, hasCourseInstance: { "@type": "CourseInstance", courseMode: "onsite", location: { "@type": "Place", name: "DHT Mobiles", address: business.address } } });
    document.head.appendChild(el); return () => el.remove();
  }, []);
  return null;
}

const empty: TrainingForm = { name: "", email: "", phone: "", experience: "", sunday: "", ownDevice: "", questions: "", adult: false };
function EnquiryForm() {
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", adult: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = <K extends keyof TrainingForm>(k: K, v: TrainingForm[K]) => { setF({ ...f, [k]: v }); if (k in errors) setErrors({ ...errors, [k]: "" }); };
  async function submit(e: React.FormEvent) {
    e.preventDefault(); if (status === "sending") return;
    const next = trainingErrors(f); setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setStatus("sending");
    try { await submitEnquiry({ kind: "contact", name: f.name, email: f.email, phone: f.phone, context: trainingCourse.enquiryContext, message: trainingMessage(f) }); setStatus("sent"); }
    catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="form-success" role="status"><CheckCircle2 size={32} /><h3>Thanks! Your Training Enquiry Has Been Sent.</h3><p>We've received your enquiry. DHT Mobiles will contact you to discuss the course and available dates. Your place is not yet booked, and no payment has been taken.</p><Button variant="outline" onClick={() => { setF(empty); setStatus("idle"); }}>Send another enquiry</Button></div>;
  const err = (k: keyof typeof errors) => errors[k] && <p className="field-error" id={`t-${k}-error`}>{errors[k]}</p>;
  return <form onSubmit={submit} noValidate>
    <div className="form-grid">
      <div><label htmlFor="t-name">Full Name</label><Input id="t-name" autoComplete="name" maxLength={100} value={f.name} onChange={e => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "t-name-error" : undefined} />{err("name")}</div>
      <div><label htmlFor="t-email">Email Address</label><Input id="t-email" type="email" autoComplete="email" maxLength={255} value={f.email} onChange={e => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "t-email-error" : undefined} />{err("email")}</div>
    </div>
    <label htmlFor="t-phone">Phone Number</label><Input id="t-phone" type="tel" autoComplete="tel" maxLength={30} value={f.phone} onChange={e => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "t-phone-error" : undefined} />{err("phone")}
    <div className="form-grid">
      <div><label htmlFor="t-exp">Your Experience (optional)</label><select id="t-exp" value={f.experience} onChange={e => set("experience", e.target.value)}><option value="">Choose one</option><option>Complete beginner</option><option>Tried a few repairs</option><option>Some repair experience</option><option>Prefer to discuss</option></select></div>
      <div><label htmlFor="t-own">Bringing Your Own Device? (optional)</label><select id="t-own" value={f.ownDevice} onChange={e => set("ownDevice", e.target.value)}><option value="">Choose one</option><option>No</option><option>Possibly — I'd like to discuss it</option></select></div>
    </div>
    <label htmlFor="t-sunday">Preferred Sunday (optional)</label><Input id="t-sunday" maxLength={100} placeholder="Any available Sunday" value={f.sunday} onChange={e => set("sunday", e.target.value)} aria-describedby="t-sunday-help" /><p className="small-note" id="t-sunday-help">A preference only — it doesn't reserve a date. We'll confirm availability on the call.</p>
    <label htmlFor="t-q">Additional Questions (optional)</label><textarea id="t-q" rows={4} maxLength={1500} value={f.questions} onChange={e => set("questions", e.target.value)} />
    <label className="flex items-start gap-3 font-medium mt-2"><input type="checkbox" className="mt-1 h-5 w-5 accent-primary" checked={f.adult} onChange={e => set("adult", e.target.checked)} aria-invalid={!!errors.adult} aria-describedby={errors.adult ? "t-adult-error" : undefined} />I confirm I am aged 18 or over.</label>{err("adult")}
    {status === "error" && <div className="field-error" role="alert"><strong className="flex items-center gap-2"><AlertCircle size={18} />We Couldn't Send Your Enquiry.</strong><p>Sorry, there was a problem sending your enquiry. Your information is still in the form. Please try again, call DHT Mobiles or contact us on WhatsApp.</p><div className="action-row"><WhatsAppButton text="Hi DHT, I'd like to ask about the beginner phone repair course." /><Button variant="outline" asChild><a href={phoneUrl}><Phone />Call {business.phone}</a></Button></div></div>}
    <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">{status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}{status === "sending" ? "Sending your enquiry…" : "Send Training Enquiry"}</Button>
    <p className="small-note">Sending an enquiry does not reserve a place or require payment. Please don't include payment details. See our <Link className="text-link" to="/privacy">privacy information</Link>.</p>
  </form>;
}

export default function Training() {
  return <>
    <CourseSchema />
    <section className="bg-secondary/40 border-b border-border"><div className="site-container grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
      <div>
        <Eyebrow>Hands-on training | Littleover, Derby</Eyebrow>
        <h1 className="text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight">Learn Phone Repairs From Scratch</h1>
        <p className="text-xl font-bold text-primary mt-3">Beginner iPhone & Samsung Repair Training</p>
        <p className="mt-4 text-muted-foreground leading-relaxed">Ever wanted to learn how to repair mobile phones? Join DHT Mobiles for a practical, beginner-friendly training session where you'll get hands-on with real devices, learn essential repair techniques and discover how everyday smartphone repairs work.</p>
        <p className="mt-3 text-muted-foreground leading-relaxed">Whether you're learning for yourself, exploring a new skill or considering a future in phone repairs, we'll help you understand the fundamentals.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-6"><Button size="lg" onClick={() => scrollTo("training-enquiry")}>Enquire About Training</Button><Button size="lg" variant="outline" onClick={() => scrollTo("course-content")}>See What You'll Learn</Button></div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-sm font-semibold">{facts.map(([Icon, t]) => <li key={t} className="flex items-center gap-2"><Icon size={18} className="text-primary" />{t}</li>)}</ul>
        <p className="small-note mt-3">Sessions are arranged by enquiry and subject to confirmation.</p>
      </div>
      <div className="relative"><img src={heroImg} alt="Technician repairing a smartphone at a repair bench" className="w-full aspect-[4/3] object-cover rounded-lg" /><div className="absolute -bottom-5 left-5 rounded-lg border border-border bg-card px-5 py-3 shadow-lg flex items-center gap-3"><Users className="text-primary" /><div><strong className="block">Max. 2 trainees</strong><span className="text-sm text-muted-foreground">per Sunday session</span></div></div></div>
    </div></section>

    <section className="section-pad"><div className="site-container">
      <Eyebrow>Why DHT Mobiles?</Eyebrow><h2>Learn From People Who Repair Phones Every Day.</h2>
      <p className="max-w-3xl text-muted-foreground">At DHT Mobiles, phone repairs are part of our day-to-day work. We're bringing our practical experience into a small-group training environment to help beginners develop useful, hands-on skills.</p>
      <p className="max-w-3xl text-muted-foreground">With a maximum of just two trainees per session, there is time to ask questions, understand each stage and practise using the tools yourself.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-8">{[[BadgeCheck, "Real Workshop Experience", "Learn from a repair team that includes technicians with over 15 years and over 10 years of practical experience respectively."], [Users, "Maximum Two Students", "Small sessions mean more personal attention, guidance and opportunities to ask questions."], [Wrench, "Learn By Doing", "Use professional repair tools and suitable practice phones to understand how common repairs are performed."]].map(([Icon, t, d]) => { const I = Icon as typeof Users; return <article key={t as string} className={card}><I className="text-primary mb-3" size={28} /><h3>{t as string}</h3><p className="text-muted-foreground mb-0">{d as string}</p></article>; })}</div>
      <p className="small-note mt-4">One member of our repair team holds a Level 3 qualification. This course does not award a Level 3 certification.</p>
    </div></section>

    <section id="course-content" className="section-pad bg-secondary/40 scroll-mt-24"><div className="site-container">
      <Eyebrow>Course content</Eyebrow><h2>The Fundamentals of Smartphone Repair.</h2>
      <p className="max-w-3xl text-muted-foreground">We'll take you through the essentials, starting with the tools and components inside a phone before exploring some of the most common repair tasks.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">{topics.map(([Icon, t, d], i) => <article key={t} className={card}><div className="flex items-center justify-between mb-3"><Icon className="text-primary" size={28} /><span className="text-sm font-bold text-muted-foreground">0{i + 1}</span></div><h3>{t}</h3><p className="text-muted-foreground mb-0">{d}</p></article>)}</div>
      <p className="small-note mt-5 max-w-3xl">The course teaches beginner-level repair techniques. The exact devices and practical tasks may vary according to the training phones and students' progress. Advanced microsoldering and complex motherboard repair are not included.</p>
    </div></section>

    <section className="section-pad"><div className="site-container grid lg:grid-cols-[1fr_1.4fr] gap-10">
      <div><Eyebrow>The training experience</Eyebrow><h2>One Day. Practical Learning From Start to Finish.</h2><p className="text-muted-foreground">Your session runs on a Sunday from 10am to 3pm. We start with the basics, then build your understanding through demonstrations and supervised practical exercises.</p><p className="small-note">The timetable is a guide and may be adjusted to suit the devices and pace of the session.</p></div>
      <ol className="border-l-2 border-primary/30 pl-6 space-y-6">{timeline.map(([time, t, d]) => <li key={time} className="relative"><span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" /><p className="text-sm font-bold text-primary mb-1">{time}</p><h3 className="mb-1">{t}</h3><p className="text-muted-foreground mb-0">{d}</p></li>)}</ol>
    </div></section>

    <section className="section-pad bg-secondary/40"><div className="site-container grid lg:grid-cols-2 gap-10 items-center">
      <div><Eyebrow>Personal training</Eyebrow><h2>Just Two Students. More Time on the Tools.</h2><p className="text-muted-foreground">We deliberately limit our beginner course to a maximum of two attendees.</p><p className="text-muted-foreground">That means you won't be sitting at the back of a crowded classroom. You'll have more opportunities to handle the equipment, follow demonstrations closely and get guidance as you work.</p><p className="text-muted-foreground">Whether you've never opened a phone before or you've tried a few simple repairs at home, the course is designed to help you progress at a comfortable pace.</p></div>
      <ul className="grid grid-cols-2 gap-4">{["Maximum 2 trainees", "Supervised practical learning", "Training devices provided", "Tools provided during the session"].map(t => <li key={t} className={`${card} flex items-center gap-3 font-semibold`}><CheckCircle2 className="text-primary shrink-0" />{t}</li>)}</ul>
    </div></section>

    <section className="section-pad"><div className="site-container">
      <Eyebrow>Who can join?</Eyebrow><h2>Start With No Experience.</h2><p className="max-w-3xl text-muted-foreground">You don't need previous repair experience or specialist qualifications. We'll introduce the fundamentals and help you become familiar with the practical process.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">{audiences.map(([Icon, t, d]) => <article key={t} className={card}><Icon className="text-primary mb-3" size={28} /><h3>{t}</h3><p className="text-muted-foreground mb-0">{d}</p></article>)}</div>
      <p className="font-semibold mt-5">All attendees must be aged 18 or over.</p>
    </div></section>

    <section className="section-pad bg-secondary/40"><div className="site-container grid lg:grid-cols-2 gap-10">
      <div><Eyebrow>What's included?</Eyebrow><h2>Just Bring Yourself and a Willingness to Learn.</h2><p className="text-muted-foreground">You don't need to buy tools or source practice phones before attending. DHT Mobiles provides the equipment needed for the training session so you can focus on learning.</p><ul className="space-y-3 mt-5">{included.map(t => <li key={t} className="flex gap-3"><CheckCircle2 className="text-primary shrink-0" />{t}</li>)}</ul></div>
      <div className={card}><h3>Optional — bring your own phone</h3><p className="text-muted-foreground">Have an old phone you'd like to learn on? You're welcome to bring it along, although using your own device is optional and subject to our technician confirming it is suitable and safe for training.</p><p className="text-muted-foreground mb-0">Opening or working on a personal device carries risks, including accidental damage, data loss and loss of water resistance. Please back up any important information beforehand. The training session does not guarantee that a personal device will be repaired or returned to its previous condition. We can't work on phones with swollen or damaged batteries, and we'll never ask for your passcode.</p></div>
    </div></section>

    <section className="section-pad"><div className="site-container grid lg:grid-cols-2 gap-10 items-start">
      <div><Eyebrow>Course completion</Eyebrow><h2>A Certificate to Mark Your Progress.</h2><p className="text-muted-foreground">After completing the beginner training session, you'll receive a DHT Mobiles Certificate of Completion recognising your participation in the course.</p><p className="text-muted-foreground">It's a record of your introductory practical training and a useful starting point as you continue developing your phone repair skills.</p><p className="small-note flex gap-2"><Award size={18} className="text-primary shrink-0" />This is a DHT Mobiles-issued certificate of completion, not an externally accredited qualification or professional certification.</p></div>
      <div className="rounded-lg border-2 border-primary p-7 shadow-lg bg-card"><Eyebrow>Course details</Eyebrow><h2 className="text-2xl">One-Day Beginner Phone Repair Course</h2><ul className="space-y-2 my-5">{details.map(t => <li key={t} className="flex gap-3"><CheckCircle2 size={20} className="text-primary shrink-0" />{t}</li>)}</ul><p className="text-2xl font-extrabold">Contact us for course pricing</p><p className="text-muted-foreground text-sm">To secure a confirmed place, we'll arrange a deposit, with the remaining balance payable by the agreed date. The full course price, deposit amount, payment schedule and applicable terms will be explained before you make any payment.</p><Button size="lg" className="w-full" onClick={() => scrollTo("training-enquiry")}>Enquire About Training</Button><p className="small-note text-center mt-3">Sending an enquiry does not reserve a place or require payment.</p></div>
    </div></section>

    <section className="section-pad bg-secondary/40"><div className="site-container">
      <h2>From Enquiry to Your First Repair.</h2>
      <div className="grid md:grid-cols-3 gap-5 mt-6">{[["01", "Send Your Enquiry", "Tell us you're interested in the beginner course and provide your contact details."], ["02", "We'll Call You", "We'll discuss the course, upcoming Sunday sessions, price and deposit arrangements, and answer your questions."], ["03", "Confirm and Attend", "Once you've agreed the details and paid the required deposit, we'll confirm your place and provide the information you'll need for the day."]].map(([n, t, d]) => <article key={n} className={card}><span className="text-3xl font-extrabold text-primary">{n}</span><h3 className="mt-2">{t}</h3><p className="text-muted-foreground mb-0">{d}</p></article>)}</div>
      <p className="font-semibold mt-5">A place is only confirmed when DHT Mobiles has accepted your booking and confirmed receipt of the required deposit.</p>
    </div></section>

    <section className="section-pad"><div className="site-container"><h2>Training questions, answered.</h2><Accordion type="single" collapsible className="faq-list">{faqs.map(([q, a], i) => <AccordionItem value={`t-${i}`} key={q}><AccordionTrigger className="text-left gap-4">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section id="training-enquiry" className="section-pad bg-secondary/40 scroll-mt-24"><div className="site-container two-column contact-layout">
      <div><Eyebrow>Ready to get started?</Eyebrow><h2>Enquire About Our Phone Repair Course.</h2><p className="text-muted-foreground">Interested in learning phone repairs? Fill out the short form below and we'll get in touch to discuss the next available Sunday sessions, course pricing and how to secure your place.</p><EnquiryForm /></div>
      <div><h2>Learn Locally at DHT Mobiles in Derby.</h2><p className="text-muted-foreground">Our beginner phone repair training takes place at DHT Mobiles in Littleover, Derby.</p><p className="text-muted-foreground">You'll be learning in a practical repair-shop environment, with equipment provided and guidance throughout the session.</p><div className="action-row mb-6"><Button onClick={() => scrollTo("training-enquiry")}>Ask About Training</Button><Button variant="outline" asChild><a href={phoneUrl}><Phone />Call DHT Mobiles</a></Button></div><ShopLocation /></div>
    </div></section>
  </>;
}
