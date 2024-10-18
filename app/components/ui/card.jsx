import { cn } from '@/utils/helper'
import { forwardRef } from 'react'

const Card = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
        {...props}
    />
))

const CardHeader = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
))

const CardTitle = forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('font-semibold leading-none tracking-tight', className)}
        {...props}
    />
))

const CardDescription = forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
))

const CardContent = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-6 pt-0', className)}
        {...props}
    />
))

const CardFooter = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
