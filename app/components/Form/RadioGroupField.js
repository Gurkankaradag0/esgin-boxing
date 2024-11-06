import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const RadioGroupField = ({ form, name, label, values, ...props }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='space-y-3'>
                    <FormLabel className='flex justify-between items-center'>
                        {label}: <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className='flex flex-col space-y-1 ml-1'
                            {...props}
                        >
                            {values.map((value) => (
                                <FormItem className='flex items-center space-x-3 space-y-0'>
                                    <FormControl>
                                        <RadioGroupItem value={value.value} />
                                    </FormControl>
                                    <FormLabel className='font-normal'>{value.label}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default RadioGroupField
