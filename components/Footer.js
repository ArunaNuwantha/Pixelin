import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className="bg-primary-0 w-full font-poppins flex flex-col items-center p-2">
            <div className="flex space-x-2 justify-center p-2">
                <Link href="/"><p className="hover:text-lg ease-out">Contact us</p></Link>
                <Link href="/"><p className="hover:text-lg ease-out">About</p></Link>
            </div>
            <div className="rounded-md p-1 bg-white">
                <Image src="/images/logo-sm.jpg" height={40} width={180} loading="lazy" />
            </div>
            <div className="text-xs p-1">copyright @2022</div>
        </div>
    )
}
