import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type CheckoutOrderPayload = {
  customer_name: string;
  phone: string;
  email?: string | null;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  landmark?: string | null;
  cart_items: string;
  subtotal: number;
  delivery: number;
  total: number;
  status?: "Pending";
};

export async function saveShopOrder(payload: CheckoutOrderPayload) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        ...payload,
        status: payload.status ?? "Pending",
        created_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
