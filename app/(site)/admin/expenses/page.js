import CreateExpense from '@/components/Admin/Modals/CreateExpense'
import Expenses from '@/components/Admin/Expenses'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Giderler'
}

const ExpensesPage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='inline-flex justify-end items-center'>
                <CreateExpense
                    trigger={
                        <Button
                            variant='secondary'
                            size='lg'
                        >
                            Gider Ekle
                        </Button>
                    }
                />
            </div>
            <Expenses />
        </div>
    )
}

export default ExpensesPage
