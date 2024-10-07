'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

import { cn } from '@/utils/helper'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DatePicker = ({ value, onChange, mode = 'single', disabled, disabledDate, portal }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')}
                    disabled={disabled}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {value ? format(value, 'PPP', { locale: tr }) : <span>Tarih seçiniz</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='w-auto p-0'
                align='start'
                portal={portal}
            >
                <Calendar
                    mode={mode}
                    selected={value}
                    onSelect={onChange}
                    disabled={disabledDate ?? ((date) => date > new Date() || date < new Date('1900-01-01'))}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
