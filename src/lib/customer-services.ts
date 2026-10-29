import config from "@/data/launch-config.json";

export const launch = config;
export const business = config.candidateBusiness;
export const phoneUrl = `tel:${business.phone.replace(/\s/g, "")}`;
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`DHT Mobiles ${business.address}`)}`;
export const emailDraftUrl = (subject: string, body = "") =>
  `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const whatsappNumber = "07935434058";
export const whatsappUrl = (text = "Hi DHT Mobiles, I have a question.") =>
  `https://wa.me/447935434058?text=${encodeURIComponent(text)}`;

export interface RepairItem { id: string; name: string; pricePence: number | null; durationMinutes: number | null; availability: string }
export interface Device { id: string; brand: string; deviceType: string; kind: string; modelLabel: string; displayName: string; modelCodes: string[]; repairs: RepairItem[]; approvedForBooking: boolean }
export function estimateRepairs(items: Pick<RepairItem, "pricePence">[]) {
  return {
    knownPence: items.reduce((sum, item) => sum + (item.pricePence !== null && item.pricePence > 0 ? item.pricePence : 0), 0),
    requiresQuote: items.some(item => item.pricePence === null || item.pricePence <= 0),
  };
}
export const formatMoney = (pence: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
export function bookingDestination() {
  return config.bookings.providerUrl || null;
}
export function trackingDestination() { return config.tracking.providerUrl || null; }
export interface Product {
  id: string; slug: string; name: string; category: string; brand: string; condition: string;
  pricePence: number; imageUrl: string; specifications: string[]; stock: number; providerUrl?: string;
}
// No reference stock is promoted into a live catalogue.
export async function loadCatalogue(): Promise<Product[]> { return []; }
export function shopDestination() { return config.shop.providerUrl || null; }
export function orderWorkflowAvailable() { return Boolean(config.shop.checkoutApiBase); }
export function filterProducts(products: Product[], filters: { search: string; category: string; brand: string; condition: string; sort: string }) {
  const result = products.filter(p => (!filters.search || `${p.name} ${p.brand} ${p.specifications.join(" ")}`.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.category === "all" || p.category === filters.category) && (filters.brand === "all" || p.brand === filters.brand) && (filters.condition === "all" || p.condition === filters.condition));
  return result.sort((a, b) => filters.sort === "price-low" ? a.pricePence - b.pricePence : filters.sort === "price-high" ? b.pricePence - a.pricePence : a.name.localeCompare(b.name));
}
export function enquiryErrors(fields: { name: string; email: string; message: string }) {
  return {
    name: fields.name.trim() ? "" : "Please enter your name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ? "" : "Please enter a valid email address.",
    message: fields.message.trim() ? "" : "Please tell us what you need help with.",
  };
}
export const photoLimits = { maxFiles: 6, maxBytes: 10 * 1024 * 1024, types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"] };
/** Returns an error message for an unacceptable photo, or "" when it is fine. */
export function photoError(file: { type: string; size: number; name: string }, currentCount: number): string {
  if (currentCount >= photoLimits.maxFiles) return `You can add up to ${photoLimits.maxFiles} photos.`;
  const heic = /\.(heic|heif)$/i.test(file.name);
  if (!photoLimits.types.includes(file.type) && !heic) return `${file.name} isn't a JPG, PNG, WebP or HEIC photo.`;
  if (file.size > photoLimits.maxBytes) return `${file.name} is larger than 10MB.`;
  return "";
}
