
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): number {
    if (!content) return 1;
    const wordsPerMinute = 200;
    // Strip HTML tags
    const text = content.replace(/<[^>]*>?/gm, '');
    const noOfWords = text.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes;
}
