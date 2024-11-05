'use client'

import DataTable from '../ui/data-table'

import { useAdminStore } from '@/store/adminStore'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DelExpenseAction } from '@/actions/AdminActions'
import CreateExpense from './Modals/CreateExpense'

const Expenses = () => {
    const { expenses } = useAdminStore()

    const columns = [
        {
            accessorKey: 'expenseDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant='ghost'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className='whitespace-nowrap'
                    >
                        Gider Tarihi
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className='px-4'>
                    {format(new Date(row.getValue('expenseDate')), 'PPP', {
                        locale: tr
                    })}
                </div>
            )
        },
        {
            accessorKey: 'expenseAmount',
            header: () => (
                <span className='whitespace-nowrap'>
                    Gider Tutarı
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('expenseAmount')
        },
        {
            id: 'author',
            accessorKey: 'author.name',
            header: () => (
                <span className='whitespace-nowrap'>
                    Kayıt Yapan
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('author') ?? ''
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const expense = row.original

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
                            <DropdownMenuItem asChild>
                                <CreateExpense
                                    trigger='Düzenle'
                                    triggerClassname='w-full text-start cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                    expense={expense}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='text-destructive'
                                onClick={() => DelExpenseAction(expense._id)}
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
            data={expenses}
            columns={columns}
            filterElement={({ table }) => (
                // <Input
                //     placeholder='Üye ismine göre filtrele...'
                //     value={table.getColumn('member')?.getFilterValue() ?? ''}
                //     onChange={(event) => table.getColumn('member')?.setFilterValue(event.target.value)}
                //     className='max-w-sm'
                // />
                <></>
            )}
        />
    )
}

export default Expenses
