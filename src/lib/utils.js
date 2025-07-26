import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function verifyAuth(token, router) {
  if (!token) {
    router.push("/login");
    return false;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    await res.json(); // You can return or ignore profile data here

    return true; // Auth verified
  } catch {
    router.push("/login");
    return false;
  }
}