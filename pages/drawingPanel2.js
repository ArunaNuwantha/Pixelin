import React, { useState, useEffect, Component, useRef } from 'react';
import { getProject } from '../services/projectService';
import Pixel from '../components/Pixel';
import { socket, SocketContext } from '../context/socket';
import Link from 'next/link';
import BackButtonIcon from '../components/icons/BackButtonIcon';
import DrawingToolKit from '../components/DrawingToolKit';
import Layout from '../components/Layout';
import AccessDenied from '../components/AccessDenied';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const updateImage = (bufferData) => {
    return axios.patch('http://localhost:3000/api/drawing', { image: bufferData })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
        });
}


const DrawingPanel2 = ({ project }) => {

    const [currentProject, setCurrentProject] = useState(project);
    const [color, setColor] = useState("#000");
    const canvasRef = useRef(null);

    // useEffect(() => {
    //     const ctx = canvasRef.current.getContext('2d');
    //     let type = 'draw';
    //     let pos = { x: 0, y: 0 };
    //     canvasRef.current.addEventListener('mousedown', setPosition);
    //     canvasRef.current.addEventListener('mouseenter', setPosition);
    //     canvasRef.current.addEventListener('mousemove', (e) => {
    //         if (type === 'draw') {
    //             draw(e);
    //         }
    //     });
    //     function setPosition(e) {
    //         pos.x = e.offsetX;
    //         pos.y = e.offsetY;
    //     }
    //     function draw(e) {
    //         if (e.buttons !== 1)
    //             return;
    //         ctx.beginPath();
    //         ctx.lineWidth = 5;
    //         ctx.lineCap = 'round';
    //         ctx.strokeStyle = color;
    //         ctx.moveTo(pos.x, pos.y);
    //         setPosition(e);
    //         ctx.lineTo(pos.x, pos.y);
    //         ctx.stroke();
    //         // const bufferData = canvasRef.current.toDataURL('image/png');
    //         // updateImage(bufferData);
    //     }

    // }, [color, canvasRef]);

    useEffect(() => {
        let ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'white';
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                // ctx.fillStyle = `#${i / 255}${j / 255}${j / 255}`;
                ctx.fillRect(i * 5, j * 5, 5, 5);
            }
        }

    }, [canvasRef]);

    useEffect(() => {
        const mouseHover = (e) => {
            let ctx = canvasRef.current.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(e.offsetX, e.offsetY, 5, 5);
        }

        canvasRef.current.addEventListener('mousemove', mouseHover);
    }, [canvasRef, color]);



    useEffect(() => {
        const listener = (data) => {
            let ctx = canvasRef.current.getContext('2d');
            // console.log(data);
            const image = new Image();
            image.src = data.image;
            ctx.drawImage(image, 0, 0);
        }

        socket.on("image", listener);

        if (socket) return () => socket.off("image", listener);

    }, [canvasRef]);


    return (
        <SocketContext.Provider value={socket}>
            <Layout>
                <div className='bg-[#FFF9F5] font-poppins m-0 p-0 pl-6 w-200 h-screen'>
                    <div className='m-2 mb-4'>
                        <Link href="/" className='cursor-pointer'><BackButtonIcon /></Link>
                        <h1 className='text-4xl font-medium'>{currentProject.title}</h1>
                        <p className='pt-2'>width: {currentProject.width}px, height: {currentProject.height}px</p>
                    </div>
                    <div className='flex'>
                        <div className='mx-2'>
                            <DrawingToolKit />
                            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className='container w-full flex touch-pinch-zoom' >
                            <canvas id='canvas' width={1400} height={720} className='w-full h-full border rounded-md' ref={canvasRef}></canvas>
                        </div>

                    </div>
                </div>
            </Layout>
        </SocketContext.Provider>
    )
}

DrawingPanel2.getInitialProps = async (cxt) => {
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

export default DrawingPanel2;
