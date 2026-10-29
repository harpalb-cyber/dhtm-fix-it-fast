/** Owner-confirmed course facts. Commercial fields stay null until DHT approves them. */
export const trainingCourse = {
  id: "beginner-phone-repair",
  title: "Beginner Mobile Phone Repair Course",
  slug: "mobile-phone-repair-course",
  path: "/training/mobile-phone-repair-course",
  location: "DHT Mobiles, Littleover, Derby",
  timeZone: "Europe/London",
  maxCapacity: 1,
  brands: ["Apple", "Samsung"],
  format: "one day",
  equipmentIncluded: true,
  completionCertificate: true,
  bookingMode: "enquiry-first" as const,
  totalPricePence: null as number | null,
  depositPence: null as number | null,
  balanceDeadline: null as string | null,
  cancellationPolicy: null as string | null,
  publishedSessions: [] as string[],
  enquiryContext: "TRAINING | Beginner Mobile Phone Repair Course",
};

export type TrainingForm = { name: string; email: string; phone: string; experience: string; ownDevice: string; questions: string; };

export function trainingErrors(f: TrainingForm) {
  return {
    name: f.name.trim() ? "" : "Please enter your full name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) ? "" : "Please enter a valid email address.",
    phone: f.phone.replace(/\D/g, "").length >= 10 ? "" : "Please enter a phone number so we can call you back.",
  };
}

export function trainingMessage(f: TrainingForm) {
  return [
    `Course: ${trainingCourse.title}`, "Format: One day",
    `Experience: ${f.experience || "Not given"}`,
    `Own device: ${f.ownDevice || "Not given"}`,
    `Questions: ${f.questions.trim() || "None"}`,
  ].join("\n").slice(0, 2000);
}
