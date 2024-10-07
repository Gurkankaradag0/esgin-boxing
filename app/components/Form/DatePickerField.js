import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import DatePicker from '../ui/date-picker'

const DatePickerField = ({ form, name, label, disabled, disabledDate, portal, ...props }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                        {label}: <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            disabledDate={disabledDate}
                            portal={portal}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default DatePickerField
