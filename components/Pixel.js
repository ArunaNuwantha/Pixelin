import React, { useState, useEffect, useContext } from 'react'
import { updatePixel } from '../services/pixelService';
import SocketIOClient from "socket.io-client";
import { SocketContext } from '../context/socket';

export default function Pixel({ projectId, pixelInfo, selectedColor, pixelSize }) {

  const [color, setColor] = useState(pixelInfo.color);
  const [prevColor, setPrevColor] = useState(color);
  const [canChangeColor, setCanChangeColor] = useState(true);
  const socket = useContext(SocketContext);

  const applyColor = async () => {
    setColor(selectedColor);
    setCanChangeColor(false);
    await patchColor(projectId, pixelInfo._id, selectedColor, pixelInfo.X, pixelInfo.Y);
  }

  const changeColorOnHover = () => {
    setPrevColor(color);
    setColor(selectedColor);
  }

  const resetColor = () => {
    if (canChangeColor) {
      setColor(prevColor);
    }
    setCanChangeColor(true);
  }

  const patchColor = async (projectId, pixelId, color, X, Y) => {
    try {
      const data = { projectId, pixelId, color, X, Y };
      // console.log(data);
      const response = await updatePixel(data);
    } catch (ex) {
      if (ex.response.status === 404 || ex.response.status === 400) {
        alert(JSON.stringify(ex.response, null, 2));
      }
    }
  }

  useEffect(() => {

    const listener = (data) => {
      // console.log(data);
      if (data.projectId === projectId && data.pixelId === pixelInfo._id)
        setColor(data.color);
    }

    socket.on("pixel", listener);

    if (socket) return () => socket.off("pixel", listener);
  }, [color, pixelInfo._id, projectId, socket]);

  return (
    <div className='pixel border'
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ width: `${pixelSize}px`, height: `${pixelSize}px`, backgroundColor: color }}></div>
  )
}
