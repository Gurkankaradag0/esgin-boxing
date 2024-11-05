import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

const TextAreaField = ({ form, name, label, ...props }) => {
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
                        <Textarea
                            {...field}
                            {...props}
                            onChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default TextAreaField
