import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const InputField = ({ form, name, label, ...props }) => {
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
                        <Input
                            {...field}
                            {...props}
                            onChange={(val) =>
                                field.onChange({
                                    ...val,
                                    target: { ...val.target, value: props?.type === 'number' ? Number(val.target.value) : val.target.value }
                                })
                            }
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default InputField
