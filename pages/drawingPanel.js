import React, { useState, useEffect, useRef } from 'react';
import { getProject } from '../services/projectService';
import Pixel from '../components/Pixel';
import { socket, SocketContext } from '../context/socket';
import Link from 'next/link';
import BackButtonIcon from '../components/icons/BackButtonIcon';
import DrawingToolKit from '../components/DrawingToolKit';
import Layout from '../components/Layout';
import AccessDenied from '../components/AccessDenied';
import { useSession } from 'next-auth/react';
import Home from '.';
import { useRouter } from 'next/router';
import { ArrowCircleLeftIcon, ColorSwatchIcon, DocumentIcon, DownloadIcon } from '@heroicons/react/outline';
import Navbar from '../components/Navbar';
import EraserIcon from '../components/icons/drawingtool_icons/EraserIcon';

const DrawingPanel = ({ project }) => {

  const createCanvasArray = (p, w, h) => {
    let canvas = [];
    for (let i = 0; i < w; i++) {
      canvas[i] = [];
      for (let j = 0; j < h; j++) {
        canvas[i].push({ _id: `${i}${j}`, X: i, Y: j, color: "#fff" });
      }
    }
    if (p.pixel_board.length > 0) {
      for (let pixel of p.pixel_board) {
        canvas[pixel.X][pixel.Y] = pixel;
      }
    }
    return canvas;
  }


  const [currentProject, setCurrentProject] = useState(project);

  // setCurrentProject(project);

  let c = createCanvasArray(currentProject, currentProject.width, currentProject.height);
  const [currentCanvas, setCurrentCanvas] = useState(c);
  const [pixelSize, setPixelSize] = useState(8);
  const [color, setColor] = useState("#000");

  // useEffect(() => {
  //   const canvas = document.getElementById('dpanel');
  //   canvas.addEventListener('wheel', (e) => {
  //     console.log(e);
  //     // if (e.wheelDelta < 0 && pixelSize > 1) {
  //     //   setPixelSize(pixelSize--);
  //     // }
  //     // if (e.wheelDelta > 0) {
  //     //   setPixelSize(pixelSize++);
  //     // }
  //   })
  // }, [canvasRef, pixelSize])

  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {

    return <Home />
  }

  const handleDownloadCanvas = () => {
    const pixelSize = 5;
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    canvas.height = currentProject.height * pixelSize;
    canvas.width = currentProject.width * pixelSize;
    const ctx = canvas.getContext('2d');
    // console.log(currentCanvas);
    for (let i = 0; i < currentProject.width; i++) {
      for (let j = 0; j < currentProject.height; j++) {
        if (currentCanvas[i][j].color == '#fff') {
          ctx.fillStyle = `#000`;
        } else {
          ctx.fillStyle = `${currentCanvas[i][j].color}`;
        }
        ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        console.log(currentCanvas[i][j].color);
      }
    }
    a.href = canvas.toDataURL('image/png');
    a.download = `${currentProject.title}.png`;
    a.click();
    console.log("download image");
  }


  return (
    <SocketContext.Provider value={socket}>
      <Layout>
        <div className='bg-[#FFF9F5] font-poppins m-0 p-0 w-200 h-screen overflow-y-hidden'>
          <div className='md:hidden'>
            <Navbar />
          </div>
          <div className='m-2 mb-4'>
            <ArrowCircleLeftIcon className='h-5 w-5 text-primary-0 cursor-pointer' onClick={
              router.back
            } />
            <h1 className='text-4xl font-medium'>{currentProject.title}</h1>
            <p className='pt-2'>width: {currentProject.width}px, height: {currentProject.height}px</p>
          </div>
          <div className='flex flex-col'>
            <div className='mx-2 flex space-x-1'>
              {/* <DrawingToolKit /> */}
              <input type="color" className='form-input border-none h-5 w-5 p-0 cursor-pointer' value={color} onChange={e => setColor(e.target.value)} />
              <button onClick={() => {
                setColor("#fff");
              }}><EraserIcon /></button>
            </div>
            <div className='bg-gray-200 flex touch-pinch-zoom m-2 h-[320px] lg:w-[1390px] lg:h-[703px] overflow-auto' id='dpanel'>
              {currentCanvas.map((row, k) => {
                return (<div key={k}>
                  {row.map((pixel, rk) => <Pixel key={rk} pixelInfo={pixel} selectedColor={color} pixelSize={pixelSize} projectId={currentProject._id} />)}
                </div>)
              })}
            </div>
          </div>
          <div className='flex space-x-2 m-2'>
            <button onClick={router.back} className='p-2 bg-primary-0 rounded-md text-primary-1'>
              <div className='flex space-x-1 justify-center items-center'>
                <p>Back</p>
              </div>
            </button>
            <button className='p-2 bg-primary-0 rounded-md text-primary-1' onClick={handleDownloadCanvas}>
              <div className='flex space-x-1 justify-center items-center'>
                <DownloadIcon className='h-5 w-5' />
                <p>Download</p>
              </div>
            </button>
          </div>
        </div>
      </Layout>
    </SocketContext.Provider >
  )
}

DrawingPanel.getInitialProps = async (cxt) => {
  try {
    const res = await getProject(cxt.query.id);
    const project = res.data;
    return {
      project
    };
  } catch (error) {
    return { error };
  }
};

export default DrawingPanel;
