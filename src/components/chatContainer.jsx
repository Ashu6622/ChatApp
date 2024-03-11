import React, { useContext } from 'react'
import ChatSlice from './chatSlice'
import { MyContext } from '../Context/contextApi'
import SideNavbar from './SideNavbar';
import { IoSend } from "react-icons/io5";
import '../App.css'


function ChatContainer() {

    const context = useContext(MyContext);
    const {userChat,userMessage,setuserChat,messageArr,refDiv,loadingchat} = context;

    function scrollDown(){
        refDiv.current.scrollIntoView({behavior: "smooth"})
    }
 

    return (
    <div className='w-screen flex  h-screen'>
        <SideNavbar/>
        <div className='w-[70%] h-full bg-gray-600 rounded p-2' onLoad={scrollDown}>
            <div className='w-full h-[90%] bg-gray-400 overflow-y-scroll scroll-Bar'>

                {
                    loadingchat ? (<div className='text-center text-black font-extrabold text-3xl mt-5'>Loading Chats...</div>)
                     :
                    (messageArr?.map((items,index)=>{
                        let uId = items.currentuserUid;
                        let Userunique = JSON.parse(localStorage.getItem("userUid"));

                        let alignItem = uId === Userunique?.uid ? "end" : "start";
                        return(

                            <ChatSlice text={items.chat} name={items.userName} avatar={items.userAvatar}   direction={alignItem} id={items.id} key={items.id} uId={uId}/>
                        )
                    }))

                
            }
             <div ref={refDiv}></div>
            </div>
            <div className='w-full h-[10%] bg-gray-700 flex  gap-12 items-center px-2 '>

                <div className='w-[85%]'>
                   <textarea placeholder='Write message...' id="" cols="30" rows="1" value={userChat.chat} onChange={(e)=> setuserChat({...userChat , chat: e.target.value })} className='w-full resize-none p-2 scroll-Bar' autoFocus/>
                </div>
                <div className='flex justify-center items-center rounded-full bg-green-800 p-2 overflow-hidden'>
                    <IoSend className='text-xl text-white cursor-pointer' onClick={userMessage}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatContainer