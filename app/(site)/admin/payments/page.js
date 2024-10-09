import CreatePayment from '@/components/Admin/Modals/CreatePayment'
import Payments from '@/components/Admin/Payments'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'Ödemeler'
}

const PaymentsPage = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='inline-flex justify-end items-center'>
                <CreatePayment
                    trigger={
                        <Button
                            variant='secondary'
                            size='lg'
                        >
                            Ödeme Ekle
                        </Button>
                    }
                />
            </div>
            <Payments />
        </div>
    )
}

export default PaymentsPage
