import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import MultipleSelector from '../ui/multi-selector'

const MultiSelectField = ({ form, name, label, values = [], ...props }) => {
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
                        <MultipleSelector
                            selectFirstItem={false}
                            defaultOptions={values}
                            placeholder='Seçiniz'
                            onChange={field.onChange}
                            value={field.value}
                            className='outline-none'
                            emptyIndicator={
                                <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>Seçilecek öğe bulunamadı.</p>
                            }
                            {...props}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default MultiSelectField
