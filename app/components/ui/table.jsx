import { cn } from '@/utils/helper'
import { forwardRef } from 'react'

const Table = forwardRef(({ className, ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
        <table
            ref={ref}
            className={cn('w-full caption-bottom text-sm', className)}
            {...props}
        />
    </div>
))

const TableHeader = forwardRef(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn('[&_tr]:border-b', className)}
        {...props}
    />
))

const TableBody = forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
    />
))

const TableFooter = forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
        {...props}
    />
))

const TableRow = forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
        {...props}
    />
))

const TableHead = forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            className
        )}
        {...props}
    />
))

const TableCell = forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
        {...props}
    />
))

const TableCaption = forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm text-muted-foreground', className)}
        {...props}
    />
))

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
