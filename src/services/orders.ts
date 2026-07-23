import { supabase } from "../lib/supabase";

export type OrderLineItem = {
  name: string;
  gender: string;
  size: string;
  quantity: number;
  unit_price: number;
};

export type CreateOrderInput = {
  customer_name: string;
  phone: string;
  email?: string | null;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  landmark?: string | null;
  cart_items: OrderLineItem[];
  subtotal: number;
  delivery: number;
  total: number;
};

export type CreateOrderResult = {
  id: string;
  order_number: string;
};

const generateOrderNumber = (): string => {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SOC-${Date.now()}-${suffix}`;
};

export class OrderService {
  private getClient() {
    if (!supabase) {
      throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
    }
    return supabase;
  }

  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const client = this.getClient();
    const orderNumber = generateOrderNumber();

    const insertPayload = {
      customer_name: input.customer_name,
      phone: input.phone,
      email: input.email ?? null,
      country: input.country,
      province: input.province,
      city: input.city,
      address: input.address,
      postal_code: input.postal_code,
      landmark: input.landmark ?? null,
      cart_items: JSON.stringify(input.cart_items),
      subtotal: input.subtotal,
      delivery: input.delivery,
      total: input.total,
      order_number: orderNumber,
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    const { error } = await client
      .from("orders")
      .insert(insertPayload);

    if (error) {
      throw new Error(`Failed to save order: ${error.message}`);
    }

    return {
      id: orderNumber,
      order_number: orderNumber,
    };
  }
}

export const orderService = new OrderService();