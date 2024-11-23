'use client'
import React from 'react';
import {useAuth, useUser} from "@clerk/nextjs";
import UserCard from "@/components/custom/user-card";
import {LogOut} from "lucide-react";

const Page = () => {
    const {user} = useUser()
    const { signOut } = useAuth();
    const handleLogout = async () => {
        try {
            await signOut();
            console.log('User logged out successfully.');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    return (
        <div className={'w-full h-full flex justify-center items-center'}>
            <div className={'fixed top-2 left-2 rounded-full p-2 bg-black cursor-pointer border border-black hover:bg-white '}
                 onClick={()=>(handleLogout())}
            >
                <LogOut className={'text-white hover:text-black'}/>
            </div>
            <UserCard
                profilePic={user?.imageUrl!}
                name={user?.firstName! || 'name not set'}
                email={user?.primaryEmailAddress?.emailAddress!}
            />
        </div>
    );
};

export default Page;