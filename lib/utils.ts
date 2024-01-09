import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractPrompt(str: string) {
  // Use regular expressions to extract sentences labeled 1, 2, and 3
  const regex = /\d\.\s(.*?)\./g;
  const matches = str.matchAll(regex);

  // Extract and store the matched sentences in an array
  const extractedSentences = Array.from(matches, (match) => match[1]);

  return extractedSentences;
}

export function truncate(str: string, idx: number) {
  const slicedStr = str.slice(0, idx);

  return slicedStr + '...';
}
