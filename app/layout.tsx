import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Link from "next/link";
import {URLS} from "@/lib/constants";
import {Github} from "lucide-react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Clerk Custom Login",
    description: "Custom Clerk Login using Shadcn login page",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            {children}
            <Link className={'fixed bottom-1 right-1 rounded-full bg-black p-2'} href={URLS.github}>
                <Github className={'text-white'}/>
            </Link>
            </body>
            </html>
        </ClerkProvider>
    );
}
