'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useMemo } from 'react'
import { useAdminStore } from '@/store/adminStore'

export const description = 'An interactive bar chart'

const Dashboard = () => {
    const { payments } = useAdminStore()

    const last12MonthData = useMemo(() => {
        const momentDate = {}
        for (const payment of payments.sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime())) {
            const date = new Date(payment.paymentDate).toLocaleDateString('tr-TR', {
                month: 'long'
            })
            momentDate[date] ??= []
            momentDate[date].push(payment)
        }
        const chartData = Object.entries(momentDate).map(([date, payments]) => ({
            month: date,
            income: payments.reduce((acc, curr) => acc + (curr.paymentType === 'Income' ? curr.paymentAmount : 0), 0),
            expense: payments.reduce((acc, curr) => acc + (curr.paymentType === 'Expense' ? curr.paymentAmount : 0), 0)
        }))

        return chartData.filter((_, index) => (chartData.length > 12 ? chartData.length - 13 < index : true))
    }, [payments])

    const chartConfig = {
        income: {
            label: 'Gelir',
            color: 'hsl(var(--chart-2))'
        },
        expense: {
            label: 'Gider',
            color: 'hsl(var(--chart-3))'
        }
    }

    const total = useMemo(
        () => ({
            income: last12MonthData.reduce((acc, curr) => acc + curr.income, 0),
            expense: last12MonthData.reduce((acc, curr) => acc + curr.expense, 0)
        }),
        [last12MonthData]
    )

    return (
        <Card>
            <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
                    <CardTitle>Gelir - Gider Grafiği</CardTitle>
                    <CardDescription>Son 12 ayın toplam gelir sayısı gösteriliyor</CardDescription>
                </div>
                <div className='flex'>
                    <div className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 select-none'>
                        <span className='text-xs text-muted-foreground'>Total Gelir</span>
                        <span className='text-lg font-bold leading-none sm:text-3xl'>{total.income - total.expense} ₺</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='px-2 sm:p-6'>
                <ChartContainer
                    config={chartConfig}
                    className='aspect-auto h-[250px] w-full'
                >
                    <BarChart
                        accessibilityLayer
                        data={last12MonthData}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                        />
                        <ChartTooltip content={<ChartTooltipContent className='w-[150px]' />} />
                        <Bar
                            dataKey='income'
                            fill='var(--color-income)'
                        />
                        <Bar
                            dataKey='expense'
                            fill='var(--color-expense)'
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default Dashboard
