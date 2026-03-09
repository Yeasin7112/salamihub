import { supabase } from "@/integrations/supabase/client";

export interface EidiProfile {
  id: string;
  name: string;
  photo: string;
  message: string;
  paymentNumber: string;
  visits: number;
  createdAt: number;
}

function generateId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).slice(2, 6);
}

export async function createProfile(data: Omit<EidiProfile, "id" | "visits" | "createdAt">): Promise<EidiProfile> {
  const id = generateId(data.name);
  const { error } = await supabase.from("eidi_profiles").insert({
    id,
    name: data.name,
    photo: data.photo,
    message: data.message,
    payment_number: data.paymentNumber,
  });
  if (error) throw error;
  return { ...data, id, visits: 0, createdAt: Date.now() };
}

export async function getProfile(id: string): Promise<EidiProfile | undefined> {
  const { data } = await supabase.from("eidi_profiles").select("*").eq("id", id).single();
  if (!data) return undefined;
  return {
    id: data.id,
    name: data.name,
    photo: data.photo || "",
    message: data.message || "",
    paymentNumber: data.payment_number || "",
    visits: data.visits,
    createdAt: new Date(data.created_at).getTime(),
  };
}

export async function incrementVisit(id: string) {
  const { data } = await supabase.from("eidi_profiles").select("visits").eq("id", id).single();
  if (data) {
    await supabase.from("eidi_profiles").update({ visits: data.visits + 1 }).eq("id", id);
  }
}

export async function getLeaderboard(): Promise<EidiProfile[]> {
  const { data } = await supabase
    .from("eidi_profiles")
    .select("*")
    .order("visits", { ascending: false })
    .limit(20);
  if (!data) return [];
  return data.map((d) => ({
    id: d.id,
    name: d.name,
    photo: d.photo || "",
    message: d.message || "",
    paymentNumber: d.payment_number || "",
    visits: d.visits,
    createdAt: new Date(d.created_at).getTime(),
  }));
}

export async function getAllProfiles(): Promise<EidiProfile[]> {
  const { data } = await supabase.from("eidi_profiles").select("*");
  if (!data) return [];
  return data.map((d) => ({
    id: d.id,
    name: d.name,
    photo: d.photo || "",
    message: d.message || "",
    paymentNumber: d.payment_number || "",
    visits: d.visits,
    createdAt: new Date(d.created_at).getTime(),
  }));
}
