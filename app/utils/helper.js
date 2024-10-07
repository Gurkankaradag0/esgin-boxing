import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
