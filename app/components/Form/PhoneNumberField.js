import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const PhoneNumberField = ({ form, name, label, ...props }) => {
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
                        <InputOTP
                            maxLength={10}
                            pattern={REGEXP_ONLY_DIGITS}
                            {...field}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={8} />
                                <InputOTPSlot index={9} />
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default PhoneNumberField
