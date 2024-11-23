import { Metadata } from "next"

import Link from "next/link"

import { cn } from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button";
import {URLS} from "@/lib/constants";
import {UserAuthForm} from "@/components/forms/auth/user-auth-form";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function Page() {
    return (
        <>
            <Link
                href={URLS.signup}
                className={cn(
                    buttonVariants({variant: "ghost"}),
                    "fixed right-4 top-4 md:right-8 md:top-8"
                )}
            >
                Signup
            </Link>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login to your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email to login
                        </p>
                    </div>
                    <UserAuthForm/>
                </div>
            </div>
        </>
    )
}