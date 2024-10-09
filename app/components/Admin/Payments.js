'use client'

import DataTable from '../ui/data-table'

import { useAdminStore } from '@/store/adminStore'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from '../ui/button'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DelPayment } from '@/services/AdminServices'
import CreatePayment from './Modals/CreatePayment'

const Payments = () => {
    const { payments } = useAdminStore()

    const columns = [
        {
            accessorKey: 'paymentDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant='ghost'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className='whitespace-nowrap'
                    >
                        Ödeme Tarihi
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className='px-4'>
                    {format(new Date(row.getValue('paymentDate')), 'PPP', {
                        locale: tr
                    })}
                </div>
            )
        },
        {
            accessorKey: 'member',
            header: () => (
                <span className='whitespace-nowrap'>
                    Üye
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('member')?.name ?? ''
        },
        {
            accessorKey: 'author',
            header: () => (
                <span className='whitespace-nowrap'>
                    Kayıt Yapan
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('author')?.name ?? ''
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='h-8 w-8 p-0'
                            >
                                <span className='sr-only'>Open menu</span>
                                <DotsHorizontalIcon className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.phoneNumber)}>
                                Telefon numarasını kopyala
                            </DropdownMenuItem> */}
                            <DropdownMenuItem asChild>
                                <CreatePayment
                                    trigger='Düzenle'
                                    triggerClassname='w-full text-start cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                    payment={payment}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='text-destructive'
                                onClick={() => DelPayment(payment._id)}
                            >
                                Sil
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]
    return (
        <DataTable
            data={payments}
            columns={columns}
            filter='member'
            filterPlaceholder='İsime göre filtrele...'
        />
    )
}

export default Payments
