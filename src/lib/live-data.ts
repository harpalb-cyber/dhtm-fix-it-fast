import { supabase } from "@/integrations/supabase/client";
import type { Device, Product } from "@/lib/customer-services";

export type EnquiryKind = "contact" | "repair" | "sell" | "shop" | "postal" | "tracking";

/** Loads approved shop items (price/stock come from the live pricing sheet). */
export async function loadLiveCatalogue(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*").eq("active", true).gt("stock", 0);
  if (error) throw error;
  return (data || []).map(p => ({
    id: p.sku, slug: p.slug, name: p.name, category: p.category, brand: p.brand, condition: p.condition,
    pricePence: p.price_pence, imageUrl: p.image_url, stock: p.stock,
    specifications: [p.storage, p.colour, p.description].filter(Boolean),
  }));
}

/** Applies sheet prices / "offered" flags to one reference device. Rows not in the sheet stay quote-only. */
export async function loadDeviceWithPrices(device: Device): Promise<Device> {
  const { data, error } = await supabase.from("device_repairs").select("repair_id,price_pence,duration_minutes,available").eq("device_id", device.id);
  if (error) throw error;
  const byRepair = new Map((data || []).map(r => [r.repair_id, r]));
  return {
    ...device,
    repairs: device.repairs
      .filter(r => byRepair.get(r.id)?.available !== false)
      .map(r => { const o = byRepair.get(r.id); return o ? { ...r, pricePence: o.price_pence, durationMinutes: o.duration_minutes } : r; }),
  };
}

export async function submitEnquiry(e: { kind: EnquiryKind; name: string; email: string; phone?: string; device?: string; device_condition?: string; context?: string; message: string; photo_paths?: string[] }) {
  const { error } = await supabase.from("enquiries").insert({
    kind: e.kind, name: e.name.trim().slice(0, 100), email: e.email.trim().slice(0, 255), phone: (e.phone || "").trim().slice(0, 30),
    device: (e.device || "").trim().slice(0, 200), device_condition: (e.device_condition || "").slice(0, 50),
    context: (e.context || "").slice(0, 500), message: e.message.trim().slice(0, 2000), photo_paths: (e.photo_paths || []).slice(0, 6),
  });
  if (error) throw error;
}

/** Uploads sell-enquiry photos to the private bucket (upload-only for customers) and returns their paths. */
export async function uploadEnquiryPhotos(files: File[]): Promise<string[]> {
  const folder = `sell/${crypto.randomUUID()}`;
  return Promise.all(files.slice(0, 6).map(async (f, i) => {
    const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || "jpg";
    const path = `${folder}/${i + 1}.${ext}`;
    const { error } = await supabase.storage.from("enquiry-photos").upload(path, f, { contentType: f.type || undefined, upsert: false });
    if (error) throw error;
    return path;
  }));
}
