import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maxDate = (ageLimit = 18) => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - ageLimit, today.getMonth(), today.getDate());
  return maxDate.toISOString().split('T')[0];
};
