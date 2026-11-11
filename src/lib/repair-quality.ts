import type { RepairItem } from "./customer-services";
export const repairQualities: Record<string, string[]> = {
  screen: ["LCD", "OLED", "Original"],
  battery: ["Copy", "OEM", "Original"],
  port: ["Copy", "Original"],
};
export function qualityFor(id: string, value: string | null) {
  return repairQualities[id]?.find(q => q === value) || repairQualities[id]?.[0] || "";
}
export function pricedRepair(repair: RepairItem, quality: string): RepairItem & { quality: string; isFree?: boolean } {
  if (repair.id === "diagnostic") return { ...repair, pricePence: 0, isFree: true, quality: "" };
  return { ...repair, quality, pricePence: quality ? repair.qualityPrices?.[quality] ?? null : repair.pricePence };
}
export function repairPrice(repair: RepairItem & { isFree?: boolean }) {
  return repair.isFree ? "Free" : repair.pricePence !== null && repair.pricePence > 0 ? new Intl.NumberFormat("en-GB", { style:"currency", currency:"GBP" }).format(repair.pricePence / 100) : "Quote required";
}
