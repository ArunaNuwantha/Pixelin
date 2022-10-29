import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Home from '..';
import Layout from '../../components/Layout';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import Navbar from '../../components/Navbar';
import { addProject } from '../../services/projectService';

export default function CreateProject() {

  const [projectName, setProjectName] = useState("");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(projectName, parseInt(width), parseInt(height));
    try {
      if (height <= 100 && height > 0 && width <= 100 && width > 0) {
        const res = await addProject({ title: projectName, height: height, width: width });
        router.asPath = '/projects';
      } else {
        alert("height and width should be less than 101 and greater than 0");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
    // alert(`${projectName} Project Created`);
    setLoading(false);
  }

  const { data: session } = useSession();
  if (!session) {
    return <Home />
  }

  return (
    <Layout>
      <div className="font-poppins">
        <Navbar />
        <div className="bg-white p-5 rounded mw-75 text-center text-lg-start flex flex-col items-start w-full h-full">
          <h1 className='text-4xl mb-8 '>Create Project</h1>
          <p>Need to add canvas width and height...</p>
          {/* {JSON.stringify(session, null, 4)} */}
          <div className='p-1 mt-10'>
            <form className="form" onSubmit={submitHandler}>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              <div className="form-group border  rounded-md mb-3 text-start flex items-center justify-between w-full">
                <label className='bg-primary-0 rounded-tl-md rounded-bl-md text-primary-1 w-32 text-center text-sm py-3' htmlFor="project_name">Project Name</label>
                <input
                  type="text"
                  id="project_name"
                  placeholder="Enter Project Name"
                  required
                  onChange={(e) => setProjectName(e.target.value)}
                  className="form-control rounded-md border-none outline-none p-2 w-full"
                />
              </div>
              <div className="form-group border  rounded-md mb-3 text-start flex items-center justify-between w-full">
                <label className='bg-primary-0 rounded-tl-md rounded-bl-md text-primary-1 w-32 text-center py-2' htmlFor="width">Width </label>
                <input
                  type="text"
                  id="width"
                  placeholder="Enter width"
                  required
                  onChange={(e) => setWidth(e.target.value)}
                  className="form-control rounded-md border-none outline-none p-2 w-full"
                />
              </div>
              <div className="form-group border  rounded-md mb-3 text-start flex items-center justify-between w-full">
                <label className='bg-primary-0 rounded-tl-md rounded-bl-md text-primary-1 w-32 text-center py-2' htmlFor="height">Height</label>
                <input
                  type={'text'}
                  id="height"
                  placeholder="Enter height"
                  required
                  onChange={(e) => setHeight(e.target.value)}
                  className="form-control rounded-md border-none outline-none p-2 w-full"
                />
              </div>
              <button className="w-100 m-8 p-2 rounded-md bg-primary-0 text-primary-1 hover:bg-primary-1 hover:text-primary-0" type="submit">
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout >
  )
}
