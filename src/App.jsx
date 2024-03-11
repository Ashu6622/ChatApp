
import { useEffect,useContext } from 'react'
import ChatContainer from './components/chatContainer'
import SignUp from './components/signUp'
import { MyContext } from './Context/contextApi'

function App() {

  let isUser = localStorage.getItem("chatwindow");

  const context = useContext(MyContext);
  const {isUserlogin} = context;

  useEffect(()=>{

   console.log("****");

  },[isUserlogin])

  return (
    <div className=' bg-slate-600'>

        {
            isUser === "true" ? <ChatContainer/> : <SignUp/> 
        }
    </div>
  )
}

export default App