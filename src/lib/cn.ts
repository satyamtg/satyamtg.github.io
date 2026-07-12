import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind classes safely, resolving conflicts. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));