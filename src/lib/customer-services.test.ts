import { describe, expect, test } from "bun:test";
import { estimateRepairs, bookingDestination, orderWorkflowAvailable, trackingDestination, emailDraftUrl, filterProducts, enquiryErrors, launch, type Product } from "./customer-services";
import taxonomy from "../data/model-taxonomy-reference.json";

describe("DHT launch boundaries", () => {
  test("null prices require a quote", () => { expect(estimateRepairs([{ pricePence: null }])).toEqual({ knownPence: 0, requiresQuote: true }); });
  test("zero must not mean a free service", () => { expect(estimateRepairs([{ pricePence: 0 }]).requiresQuote).toBe(true); });
  test("known prices sum in integer pence", () => { expect(estimateRepairs([{ pricePence: 1050 }, { pricePence: 2250 }])).toEqual({ knownPence: 3300, requiresQuote: false }); });
  test("one quote-only item prevents a complete numeric total", () => { expect(estimateRepairs([{ pricePence: 1050 }, { pricePence: null }])).toEqual({ knownPence: 1050, requiresQuote: true }); });
  test("unresolved bookings do not invent availability", () => { expect(bookingDestination()).toBeNull(); });
  test("unresolved checkout does not allow browser-only orders", () => { expect(orderWorkflowAvailable()).toBe(false); });
  test("unresolved tracking does not expose sample records", () => { expect(trackingDestination()).toBeNull(); });
  test("reference taxonomy remains quote-only and unapproved", () => { expect(taxonomy.devices.length).toBeGreaterThan(0); expect(taxonomy.devices.every(d => !d.approvedForBooking && d.repairs.every(r => r.pricePence === null))).toBe(true); });
  test("automatic valuation is disabled", () => { expect(launch.sellDevice.instantValuation).toBe(false); });
  test("publication remains owner controlled", () => { expect(launch.publishAutomatically).toBe(false); });
  test("email fallback safely encodes the repair context", () => { const url = new URL(emailDraftUrl("Repair & quote", "Apple iPhone 15\nScreen & battery")); expect(url.protocol).toBe("mailto:"); expect(url.searchParams.get("body")).toBe("Apple iPhone 15\nScreen & battery"); });
  test("enquiries reject missing name, email and message", () => { expect(Object.values(enquiryErrors({ name: "", email: "invalid", message: " " })).every(Boolean)).toBe(true); expect(Object.values(enquiryErrors({ name: "Test", email: "test@example.com", message: "Quote please" })).every(v => !v)).toBe(true); });
});
test("shop filters combine and prices sort", () => {
  const base = { category: "phones", brand: "Apple", condition: "refurbished", imageUrl: "", specifications: [], stock: 1 };
  const products: Product[] = [{ ...base, id: "a", slug: "a", name: "Phone Alpha", pricePence: 20000 }, { ...base, id: "b", slug: "b", name: "Phone Beta", pricePence: 10000 }, { ...base, id: "c", slug: "c", name: "Phone Other", pricePence: 5000, brand: "Samsung" }];
  expect(filterProducts(products, { category: "phones", brand: "Apple", condition: "refurbished", search: "phone", sort: "price-low" }).map(p => p.id)).toEqual(["b", "a"]);
});
import { whatsappUrl } from "./customer-services";
describe("whatsapp", () => {
  test("links to DHT's WhatsApp 07935434058 in international format", () => {
    const url = new URL(whatsappUrl("iPhone 13 screen"));
    expect(url.pathname).toBe("/447935434058");
    expect(url.searchParams.get("text")).toBe("iPhone 13 screen");
  });
});

import { photoError } from "./customer-services";
describe("sell photo limits", () => {
  test("accepts a 5MB jpeg", () => expect(photoError({ type: "image/jpeg", size: 5e6, name: "a.jpg" }, 0)).toBe(""));
  test("rejects over 10MB", () => expect(photoError({ type: "image/png", size: 10 * 1024 * 1024 + 1, name: "a.png" }, 0)).not.toBe(""));
  test("rejects a 7th photo", () => expect(photoError({ type: "image/png", size: 100, name: "a.png" }, 6)).not.toBe(""));
  test("rejects pdf", () => expect(photoError({ type: "application/pdf", size: 100, name: "a.pdf" }, 0)).not.toBe(""));
});
