'use client'

import DataTable from '../ui/data-table'

import { useAdminStore } from '@/store/adminStore'

import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DelMember } from '@/services/AdminServices'
import CreateMember from './Modals/CreateMember'

const Members = () => {
    const { members } = useAdminStore()

    const columns = [
        {
            accessorKey: 'name',
            header: 'İsim',
            cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
        },
        {
            accessorKey: 'registrationDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant='ghost'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        className='whitespace-nowrap'
                    >
                        Kayıt Tarihi
                        <CaretSortIcon className='ml-2 h-4 w-4' />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className='px-4'>
                    {format(new Date(row.getValue('registrationDate')), 'PPP', {
                        locale: tr
                    })}
                </div>
            )
        },
        {
            accessorKey: 'courseType',
            header: () => (
                <span className='whitespace-nowrap'>
                    Ders Türü
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => (row.getValue('courseType') === 'personal' ? 'Özel' : 'Grup')
        },
        {
            accessorKey: 'amountToBePaid',
            header: () => (
                <span className='whitespace-nowrap'>
                    Ödenecek Tutar
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('amountToBePaid')
        },
        {
            accessorKey: 'phoneNumber',
            header: () => (
                <span className='whitespace-nowrap'>
                    Telefon Numarası
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('phoneNumber')
        },
        {
            accessorKey: 'author',
            header: () => (
                <span className='whitespace-nowrap'>
                    Kayıt Alan
                    <div className='hidden' />
                </span>
            ),
            cell: ({ row }) => row.getValue('author')?.name ?? ''
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const member = row.original

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
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.phoneNumber)}>
                                Telefon numarasını kopyala
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <CreateMember
                                    trigger='Düzenle'
                                    triggerClassname='w-full text-start cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                    member={member}
                                />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='text-destructive'
                                onClick={() => DelMember(member._id)}
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
            data={members}
            columns={columns}
            filterElement={({ table }) => (
                <Input
                    placeholder='name'
                    value={table.getColumn('name')?.getFilterValue() ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
            )}
        />
    )
}

export default Members
