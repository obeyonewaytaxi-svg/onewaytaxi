import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export function makeSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/→/g, 'to')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
