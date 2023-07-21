import React,{useState,useRef} from 'react'
import { useDispatch } from 'react-redux'
import { setVideoCollection } from '../redux/videoAction'
import DropFileInput from './DropFileInput';


function DragAndDrop() {
    const dispatch =  useDispatch();

  return (
    <div>
        <DropFileInput/>
    </div>
  )
}

export default DragAndDrop