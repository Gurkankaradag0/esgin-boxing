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
                            {...props}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={0}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={1}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={2}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                            </InputOTPGroup>
                            <InputOTPSeparator className='max-[512px]:hidden' />
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={3}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={4}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={5}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                            </InputOTPGroup>
                            <InputOTPSeparator className='max-[512px]:hidden' />
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={6}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={7}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                            </InputOTPGroup>
                            <InputOTPSeparator className='max-[512px]:hidden' />
                            <InputOTPGroup>
                                <InputOTPSlot
                                    index={8}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                                <InputOTPSlot
                                    index={9}
                                    className='max-[440px]:w-8 max-[400px]:w-7 max-[360px]:w-6 max-[320px]:w-5'
                                />
                            </InputOTPGroup>
                        </InputOTP>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default PhoneNumberField
