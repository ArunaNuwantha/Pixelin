/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react'
import { getProviders, getSession } from 'next-auth/react'
import Image from 'next/image';
import GoogleIcon from '../components/icons/GoogleIcon';
import { useSession, signIn, signOut } from "next-auth/react"
import CreateProject from './projects/createProject';

export default function Login({ providers }) {

  return (
    <div className='container min-w-full h-screen flex '>
      <div className='bg-primary-0 h-screen w-[1076px] flex justify-center items-center' >
        <img
          className="px-2 hidden md:inline-block"
          src="/images/login_page/login.png"
          alt="Pixelin logo"
          width={956}
          height={956}
          loading="lazy"
        />
      </div>
      <div className='md:bg-white bg-primary-0 h-full md:w-[850px] flex flex-col items-center'>
        <div className='min-w-full w-screen md:w-full items-center flex justify-start md:justify-end bg-white'>
          <Link href="/">
            <Image
              className=''
              src="/images/logo-sm.jpg"
              alt="Pixelin logo"
              width={220}
              height={100}
              loading="lazy"
            />
          </Link>
        </div>
        <div className='mt-40 m-8 md:ml-[60px] font-poppins w-[420px] md:w-[480px] '>
          <h1 className='text-4xl font-semibold text-[64px] text-typo-0 uppercase'>Welcome</h1>
          <p className='text-typo-1 p-2 pt-10 uppercase'>Join Pixelin to draw your own pixel art. pixels make your life beautiful.</p>
          <h2 className='text-typo-0 p-2 pt-5 text-[32px]'>Sign in</h2>
          {/* <div className='flex '>
            <p className='text-typo-1 p-2 pt-5'>New User?</p>
            <Link href="/auth/signup"><button className='text-primary-0 font-semibold pt-3'>Create an Account</button></Link>
          </div> */}
          {Object.values(providers).map((provider) => (
            <button key={provider.name} className='flex p-2 h-13 w-60 rounded-full justify-center bg-primary-1 transition-all hover:scale-105 shadow-sm shadow-primary-0 mt-2' onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              <GoogleIcon />
              <p className='text-typo-0 pl-1 group-hover:text-white'>Continue with {provider.name}</p>
            </button>
          )
          )}
        </div>
      </div>

    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers)
  return {
    props: {
      providers
    }
  }
}



