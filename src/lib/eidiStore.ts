export interface EidiProfile {
  id: string;
  name: string;
  photo: string;
  message: string;
  paymentNumber: string;
  visits: number;
  createdAt: number;
}

const STORE_KEY = "eidilink_profiles";

function getAll(): EidiProfile[] {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(profiles: EidiProfile[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(profiles));
}

export function createProfile(data: Omit<EidiProfile, "id" | "visits" | "createdAt">): EidiProfile {
  const profiles = getAll();
  const id = data.name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).slice(2, 6);
  const profile: EidiProfile = { ...data, id, visits: 0, createdAt: Date.now() };
  profiles.push(profile);
  save(profiles);
  return profile;
}

export function getProfile(id: string): EidiProfile | undefined {
  return getAll().find((p) => p.id === id);
}

export function incrementVisit(id: string) {
  const profiles = getAll();
  const p = profiles.find((p) => p.id === id);
  if (p) {
    p.visits++;
    save(profiles);
  }
}

export function getLeaderboard(): EidiProfile[] {
  return getAll().sort((a, b) => b.visits - a.visits).slice(0, 20);
}

export function getAllProfiles(): EidiProfile[] {
  return getAll();
}
