import React, { useContext, useRef } from 'react'
import { FaTrash } from "react-icons/fa";
import { MyContext } from '../Context/contextApi';

const ChatSlice = function({direction,text,name,avatar,id,uId}) {

  const context = useContext(MyContext);
  const {isDelete,functionality,DeleteChat} = context;


  return (
    <div className={`flex ${direction === "end" ?  "justify-end" : "justify-start"} `}>
    <div className={`flex p-1 m-2 max-w-[70%] gap-2 ${direction === "end" ? 'cursor-pointer' : null}`}>

        <div className='w-8 h-6 border-2 rounded-full overflow-hidden'>
            <img src={avatar} alt="" className='w-full h-full object-cover' />
        </div>
        <div className={`flex flex-col border-2 w-full rounded-lg p-1 ${direction === "end" ? "bg-gray-500" : "bg-gray-700" }`} onClick={()=> functionality()}>
            <div className='text-xs text-black'>{name}</div>

            <div className={`text-white w-full`}>{text}</div>

        </div>

        <div className='flex gap-2'>
        {
          direction === "end" && isDelete ? <FaTrash className='text-red-600' onClick={()=>DeleteChat(id,uId)}/> : null
        }
       
        </div>
        </div>
        </div>
     
  )
      }

export default ChatSlice