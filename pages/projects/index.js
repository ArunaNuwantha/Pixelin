import { ArrowRightIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import Home from '..';
import Navbar from '../../components/Navbar';
import { getProjects } from '../../services/projectService';

export default function Projects({ projects }) {

    const { data: session } = useSession();

    if (session) {
        return (
            <div>
                <Navbar />
                <Link href="/projects/createProject"><p className='m-2 p-1 font-poppins text-white bg-primary-0 mt-2 w-fit rounded-md cursor-pointer hover:bg-primary-1 hover:first-line:text-primary-0'>Create Project</p></Link>
                <div className='grid grid-cols-2 p-1'>
                    {projects.map((project) => {
                        return (
                            <Link key={project._id} href={`/drawingPanel?id=${project._id}`} className="">
                                <div className="h-16 bg-primary-2 m-1 p-2 font-poppins flex items-center justify-between rounded-md cursor-pointer transition-all hover:scale-95 ease-out">
                                    <div>
                                        <p className='text-md uppercase font-semibold text-primary-0 overflow-hidden'>{project.title}</p>
                                        <p className='font-normarl text-gray-400 text-[10px] overflow-hidden'>width:{project.width}px height: {project.height}px</p>
                                    </div>
                                    <div>
                                        <ArrowRightIcon className='h-4 w-6 text-primary-0' />
                                    </div>
                                </div>
                            </Link>)
                    })}
                </div>
            </div>
        )
    } else {
        return <Home />
    }

}

Projects.getInitialProps = async (ctx) => {
    try {
        const res = await getProjects();
        const projects = await res.data;
        return {
            projects
        }
    } catch (e) {
        return {
            projects: {}
        }
    }
};
