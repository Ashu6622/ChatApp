import React, { useContext } from 'react'
import '../App.css'
import { MyContext } from '../Context/contextApi'

const SideNavbar = ()=> {

  const context = useContext(MyContext);
  const {allUsers,LogoutUser,loadingmembers} = context;
  // console.log(allUsers);
  return (
    <div className='w-[30%] h-screen p-2'>
      <div className='w-full h-full bg-gray-500 p-3'>
        <div className='w-full  text-center py-2 px-1 rounded bg-black text-white font-bold cursor-pointer mb-3' onClick={LogoutUser}>
          <button>Logout</button>
        </div>
        <div>
          <h1 className='text-white'>Online Members ({allUsers?.length})</h1>
        </div>

        <div className='w-full h-[620px] overflow-y-scroll scroll-Bar'>

      {
        loadingmembers ? (<div className='text-center text-black text-2xl font-extrabold'>Loading Members ...</div>)
        :
        (allUsers.map((items)=>{
          return (

            <div className='flex gap-4 items-center  bg-black rounded p-2 mt-3' key={items.uid}>
            <div className='w-9 h-9 rounded-full overflow-hidden'>
              <img src={items.avatar} alt="" />
            </div>
            <div>
           <h1 className='text-white'>{items.displayname}</h1>
            </div>
            </div>
           

          )
        }))
      }

         

        
        
        
      </div>
    </div>
    </div>
  )

}

export default SideNavbar