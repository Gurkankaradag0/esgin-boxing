import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const SelectField = ({ form, name, label, values = [], ...props }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='flex justify-between items-center'>
                        {label}: <FormMessage />
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder='Seçiniz' />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {values.map(({ value, label: SelectLabel }, index) => (
                                <SelectItem
                                    value={value}
                                    key={index}
                                >
                                    {SelectLabel}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default SelectField
