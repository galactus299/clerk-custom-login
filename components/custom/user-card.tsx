import React from 'react';

type UserCardProps = {
    profilePic: string;
    name: string;
    email: string;
}
const UserCard = (props:UserCardProps) => {
    const {name, profilePic,email} = props;
    return (
        <div
            className="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">

        <span
            className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
            user
        </span>

            <div className="w-full flex justify-center sm:justify-start sm:w-auto">
                <img className="object-cover w-20 h-20 mt-3 mr-3 rounded-full" alt={'profilePic'}
                     src={profilePic}/>
            </div>

            <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">

                <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200" itemProp="author">
                    {name}
                </p>

                <div className="mb-4 md:text-lg text-gray-400">
                    <p>{email}</p>
                </div>


            </div>

        </div>

    );
};

export default UserCard;