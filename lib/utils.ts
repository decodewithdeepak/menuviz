import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadImage(url: string, prefix: string) {
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.download = `${prefix}-${timestamp}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

