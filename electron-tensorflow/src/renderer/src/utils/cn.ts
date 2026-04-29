import {
    clsx, type ClassValue
} from 'clsx'
import {
    twMerge
} from 'tailwind-merge'

// どんなプロジェクトでも使い回せる最強のユーティリティ
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}