import React from 'react'
import ColorSelectIcon from './icons/drawingtool_icons/ColorSelectIcon'
import EraserIcon from './icons/drawingtool_icons/EraserIcon'
import PaintBrushIcon from './icons/drawingtool_icons/PaintBrushIcon'
import PaintBucketIcon from './icons/drawingtool_icons/PaintBucketIcon'
import PaintIcon from './icons/drawingtool_icons/PaintIcon'
import PointerIcon from './icons/drawingtool_icons/PointerIcon'
import RedoIcon from './icons/drawingtool_icons/RedoIcon'
import TextSizeIcon from './icons/drawingtool_icons/TextSizeIcon'
import UndoIcon from './icons/drawingtool_icons/UndoIcon'
import ZoomIcon from './icons/drawingtool_icons/ZoomIcon'

export default function DrawingToolKit() {
    return (
        <div className='md:w-[144px] md:h-[320px] border rounded-md md:mb-2 flex md:flex-col border-primary-0'>
            <div className='w-full md:rounded-t-md bg-primary-0 flex justify-center items-center'>
                <p className='font-poppins font-semibold text-xs p-1 text-center md:text-lg text-white'>Drawing Tool</p>
            </div>
            <div className='md:grid md:grid-cols-2 md:p-4 flex md:flex-col bg-white'>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><UndoIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><RedoIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><PointerIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><ZoomIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><PaintIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><PaintBrushIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><TextSizeIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><PaintBucketIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><ColorSelectIcon /></button>
                <button className="p-1 h-10 w-8 md:w-12 hover:bg-primary-1 rounded-md flex justify-center"><EraserIcon /></button>
            </div>
        </div>
    )
}
