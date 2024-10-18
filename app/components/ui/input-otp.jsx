'use client'

import { DashIcon } from '@radix-ui/react-icons'
import { OTPInput, OTPInputContext } from 'input-otp'

import { cn } from '@/utils/helper'
import { forwardRef } from 'react'

const InputOTP = forwardRef(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
    />
))

const InputOTPGroup = forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center', className)}
        {...props}
    />
))

const InputOTPSlot = forwardRef(({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
        <div
            ref={ref}
            className={cn(
                'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                isActive && 'z-10 ring-1 ring-ring',
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                    <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
                </div>
            )}
        </div>
    )
})

const InputOTPSeparator = forwardRef(({ ...props }, ref) => (
    <div
        ref={ref}
        role='separator'
        {...props}
    >
        <DashIcon />
    </div>
))

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
