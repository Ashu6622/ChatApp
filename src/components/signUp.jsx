import React, { useContext } from 'react'
import { MyContext } from '../Context/contextApi'

function SignUp() {

    const context = useContext(MyContext);
    const {SignIn} = context;
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='rounded-lg text-xl py-3 px-6 border-2 cursor-pointer' onClick={SignIn}>
            Sign In with Google
        </div>
    </div>
  )
}

export default SignUp