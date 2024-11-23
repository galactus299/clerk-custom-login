"use client";

import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";


export function VerifyOTP({
                              code,
                              setCode,
                          }: {
    code: string;
    setCode: CallableFunction;
}) {

    return (
        <div className="grid gap-1">
            <InputOTP
                maxLength={6}
                onChange={(v) => {
                    setCode(v);
                }}
                value={code}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <div className="font-light text-xs text-primary">
               Enter the otp sent to you mail
            </div>
        </div>
    );
}
