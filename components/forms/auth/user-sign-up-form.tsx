"use client";

import {  useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";
import {PasswordInput} from "@/components/custom/password-input";
import {useToast} from "@/hooks/use-toast";
import {URLS} from "@/lib/constants";
import {cn} from "@/lib/utils";
import { Icons } from "@/components/icons";
import {VerifyOTP} from "@/components/custom/verify-otp";

type UserSignUpFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [terms, setTerms] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  // start the sign up process.
  async function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    setVerifying(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(false);
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      const errorCode = err?.errors[0]?.code;
      let errorMessage = errorCode
        ? err?.errors[0]?.longMessage
        :"user-sign-up-form.error.label";
      if (errorCode) {
        errorMessage =errorCode;
      }
      setVerifying(false);
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    }
  }

  // This verifies the user using email code that is delivered.
  async function onPressVerify(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    setVerifying(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
                 or if the user needs to complete more steps.*/
        toast({
          variant: "destructive",
          description:
            JSON.stringify(completeSignUp) ||
           "user-sign-up-form.error.label",
        });
        // console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (
        completeSignUp.status === "complete" &&
        completeSignUp.createdUserId
      ) {
        await setActive({ session: completeSignUp.createdSessionId });

        // if you want to store clerId to your db call a function
        // here like following sample using query
        // await mutateAsync({
        //   email: emailAddress,
        //   clerkId: completeSignUp.createdUserId,
        // });
        router.push(URLS.home);
      }
      setVerifying(false);
    } catch (err: any) {
      const errorCode = err?.errors[0]?.code;
      let errorMessage = errorCode
        ? err?.errors[0]?.longMessage
        :"user-sign-up-form.error.label";
      if (errorCode) {
        errorMessage =errorCode;
      }

      toast({
        variant: "destructive",
        description: errorMessage,
      });
    }
    setVerifying(false);
  }

  const onTermsChecked = (checked: boolean) => {
    if (checked) {
      setTerms(true);
    } else {
      setTerms(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div id="clerk-captcha" />
        {!pendingVerification ? (
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label
                className="ml-2 text-gray-500 font-light text-xs"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={pendingVerification}
                id="email"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
                placeholder={
                  "Enter your email address"
                }
                type="email"
              />
            </div>
            <div className="grid gap-1">
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
                disabled={pendingVerification}
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
                  <Checkbox id="terms" onCheckedChange={onTermsChecked} />
                  <label
                    className="text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="terms"
                  >
                    {"I agree to the terms"}
                  </label>
                </div>
              </div>
            </div>
            <Button
              disabled={
                pendingVerification || !terms || !emailAddress || !password
              }
              onClick={(e) => {
                void handleSubmit(e);
              }}
              type="button"
              variant="default"
            >
              {verifying ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Signup
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <Label
              className="ml-2 text-primary-light font-bold text-xs"
              htmlFor="email"
            >
              {"user-sign-up-form.otp.label"}
            </Label>
            <VerifyOTP code={code} setCode={setCode} />
            <div className="self-center text-center">
              <Button
                type={"button"}
                variant={"default"}
                className="w-full"
                disabled={code.length !== 6}
                onClick={(e) => {
                  void onPressVerify(e);
                }}
              >
                {verifying ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
               Verify
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
