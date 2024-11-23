"use client";

import React, { MouseEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import {cn} from "@/lib/utils";
import {URLS} from "@/lib/constants";
import {PasswordInput} from "@/components/custom/password-input";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import { Icons } from "@/components/icons";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const { toast } = useToast();


    // start the sign In process.
    async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
        setIsLoading(true);
        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // await sleep(100)
                window.location.href = '/';
            } else {
                /*Investigate why the sign-in hasn't completed */
                toast({
                    variant: "destructive",
                    description: "user-auth-form.logIn.error",
                });
            }
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            toast({
                variant: "destructive",
                description:
                    err?.errors[0]?.code ||
                    "user-auth-form.logIn.error",
            });
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form>
                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <Label
                            className="ml-2 text-gray-500 font-light text-xs"
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            autoCorrect="off"
                            disabled={isLoading}
                            id="email"
                            onChange={(e) => {
                                setEmailAddress(e.target.value);
                            }}
                            placeholder={"enter you email"}
                            type="email"
                            value={emailAddress}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            className="ml-2 text-gray-500 font-light text-xs"
                            htmlFor="password"
                        >
                            Password
                        </Label>
                        <PasswordInput
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder={
                                "Enter your password"
                            }
                            value={password}
                        />
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms"/>
                                <label
                                    className="text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="terms"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>
                        {/*  add forgot password here in future */}
                        {/*<div className="text-xs font-light hidden">*/}
                        {/*    <Link >*/}
                        {/*        {"user-auth-form.forgotPassword.label"}*/}
                        {/*    </Link>*/}
                        {/*</div>}*/}
                    </div>
                    <Button
                        className="my-8"
                        disabled={isLoading || !emailAddress || !password}
                        onClick={(e) => {
                            void handleSubmit(e);
                        }}
                        variant="default"
                    >
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                       Login
                    </Button>
                </div>
            </form>
        </div>
    );
}
