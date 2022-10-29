import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { LogoutIcon } from '@heroicons/react/outline'

function Navbar() {

    const { data: session } = useSession();

    return (

        <div className='bg-primary-0 w-screen h-14 flex items-center justify-between'>
            <div className='m-2 flex space-x-1 md:space-x-2 items-center'>
                <Link href="/">
                    <Image
                        className="rounded-md hover:scale-75 transition-all ease-out"
                        src="/images/sidebar_logo.jpg"
                        alt="Pixelin logo"
                        width={40}
                        height={40}
                    />
                </Link>
                <p className='text-primary-1 text-xl md:text-2xl font-poppins'>Pixelin</p>
            </div>
            <div className='flex items-center mr-1'>
                <Link href="/" ><p className='transition-all ease-in duration-100  px-1 md:px-2 hover:text-lg md:text-lg font-poppins text-primary-1 hover:text-gray-200 cursor-pointer'>Home </p></Link>
                {!session && <Link href="/login" ><p className='transition-all ease-in duration-100  px-1 md:px-2 hover:text-lg md:text-lg font-poppins text-primary-1 hover:text-gray-200 cursor-pointer'>Login </p></Link>}
                {session && <Link href="/projects" ><p className='transition-all ease-in duration-100  px-1 md:px-2 hover:text-lg md:text-lg font-poppins text-primary-1 hover:text-gray-200 cursor-pointer'>Projects</p></Link>}
                {session && <div className='mr-2 flex items-center'>
                    <Link href="/">
                        <Image
                            className="rounded-full"
                            src={session.user.image}
                            alt="Pixelin logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>}
                {session && <LogoutIcon className='h-5 w-5 text-primary-1 mr-2 cursor-pointer' onClick={signOut} />}
            </div>
        </div>
    )
}

export default Navbar