import { DownloadIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { getProject, updateProjectImageData } from "../services/projectService";

function drawRect(ctx, i, j, size, color) {
    if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(i, j, size, size);
    }
}

function drawGrid(ctx, size, height, width, color) {
    if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.2;
        for (let i = 0; i <= width; i++) {
            ctx.beginPath();
            ctx.moveTo(i * size, 0);
            ctx.lineTo(i * size, height);
            ctx.stroke();
        }
        for (let i = 0; i <= height; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * size);
            ctx.lineTo(width, i * size);
            ctx.stroke();
        }
    }
}

export default function DrawingPanel3({ project }) {
    const [pixelSize, setPixelSize] = useState(10);
    const [color, setColor] = useState("#000");
    const [isGrid, setIsGrid] = useState(true);
    const [imageData, setImageData] = useState(project.imageData);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const router = useRouter();

    const handleDownloadCanvas = () => {
        const a = document.createElement('a');
        a.href = canvasRef.current.toDataURL('image/png');
        a.download = `${project.title}.png`;
        a.click();
        console.log("download image");
    }

    const handleSaveImage = async (id) => {
        try {
            setImageData(canvasRef.current.toDataURL());
            const res = await updateProjectImageData({ id, imageData: JSON.stringify(imageData) });
            // console.log(res.data);
        } catch (e) {
            alert(e);
        }

    }

    useEffect(() => {
        canvasRef.current = document.getElementById("canvas");
        canvasRef.current.height = 1020;
        canvasRef.current.width = 1980;

        //development
        // canvasRef.current.height = 100;
        // canvasRef.current.width = 100;

        ctxRef.current = canvasRef.current.getContext("2d");
        // drawGrid(
        //     ctxRef.current,
        //     pixelSize,
        //     canvasRef.current.height,
        //     canvasRef.current.width,
        //     "black"
        // );


        return () => {
            console.log("dismount 1");
        };
    }, [pixelSize, setPixelSize, canvasRef, ctxRef]);

    // useEffect(() => {
    //     const image = new Image();

    //     // console.log(JSON.parse(project.imageData));

    //     ctxRef.current.drawImage(image, 0, 0);
    //     image.src = JSON.parse(imageData);

    // }, [imageData, setImageData]);

    useEffect(() => {
        canvasRef.current.addEventListener("click", (e) => {
            const x = Math.floor(e.offsetX / pixelSize) * pixelSize;
            const y = Math.floor(e.offsetY / pixelSize) * pixelSize;
            drawRect(ctxRef.current, x, y, pixelSize, color);
        });

        return () => {
            console.log("dismount 2");
        };
    }, [pixelSize, ctxRef, canvasRef, color, setColor]);

    return (
        <div className="font-poppins">
            <Navbar />
            <div className="space-x-2 mx-2">
                <input type="color" className="p-1 w-5 h-5" onChange={(e) => {
                    setColor(e.target.value);
                    console.log(e.target.value);
                }} />
                <button onClick={(e) => {
                    if (isGrid) {
                        drawGrid(ctxRef.current, pixelSize, canvasRef.current.height, canvasRef.current.width, "white");
                    } else {
                        drawGrid(ctxRef.current, pixelSize, canvasRef.current.height, canvasRef.current.width, "black");
                    }
                    setIsGrid(!isGrid);
                }}>Grid</button>
            </div>
            <div id="drawing_panel" className="h-[400px] md:h-full w-full overflow-auto m-2 border rounded-sm">
                <canvas id="canvas" ref={canvasRef}></canvas>
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
                <button onClick={() => { handleSaveImage(project._id) }} className='p-2 bg-primary-0 rounded-md text-primary-1'>
                    <div className='flex space-x-1 justify-center items-center'>
                        <p>Save</p>
                    </div>
                </button>
            </div>
        </div>
    );
}


DrawingPanel3.getInitialProps = async (cxt) => {
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

