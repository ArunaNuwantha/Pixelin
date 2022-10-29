import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import CreatorIcon from './icons/CreatorIcon';
import ProjectIcon from './icons/ProjectIcon';



export default function SideBar() {

  const normalClass = 'group m-6 min-w-28 flex p-2 py-4 rounded-md border-l-4 border-l-primary-0 hover:border-l-secondary-0 bg-white items-center cursor-pointer hover:bg-primary-0';

  const { data: session } = useSession();

  if (session) {
    return (

      <div className="bg-sidebar h-screen hidden md:inline-block" style={{ width: "315px" }}>
        <div className="px-6 pt-6 flex justify-between">
          <Link href="/" >
            <Image
              className="rounded-md"
              src="/images/sidebar_logo.jpg"
              alt="Pixelin logo"
              width={40}
              height={40}
            />
          </Link>
          <div className='flex align-middle'>
            <Image
              className="rounded-full px-2"
              src={`${session.user.image}`}
              alt="Pixelin logo"
              width={37}
              height={37}
            />
            <svg className='mt-4 ml-2' width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8.83325L0 0.833252H16L8 8.83325Z" fill="#FFC9A3" />
            </svg>

          </div>
        </div>
        <div className='container '>
          <div className={normalClass}>
            <ProjectIcon />
            <p className='pl-4 text-lg font-bold text-primary-0 group-hover:text-white'>Projects</p>
          </div>
          <div className={normalClass}>
            <CreatorIcon />
            <p className='pl-4 text-lg font-bold text-primary-0 group-hover:text-white'>Creators</p>
          </div>
          <div className={normalClass}>
            <CreatorIcon />
            <p className='pl-4 text-lg font-bold text-primary-0 group-hover:text-white'>My Projects</p>
          </div>
        </div>
      </div>
    )

  }


}
