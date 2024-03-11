import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { DB } from '../firebase/firebaseconfig';
import { addDoc,Timestamp,collection, query, orderBy, onSnapshot, QuerySnapshot, deleteDoc, doc } from 'firebase/firestore';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebaseconfig';


export const MyContext = createContext();
function ContextApi({children}) {

    const [messageArr,setmessageArr] = useState([]);
    const [allUsers, setallUsers] = useState([]);
    const [isDelete , setisDelete] = useState(false);
    const [isstarmessage,setisstarmessage] = useState(false);
    const [loadingchat , setloadingchat] = useState(true);
    const [loadingmembers , setloadingmembers] = useState(true);
    const [isUserlogin , setisUserlogin] = useState(false);
    const refDiv = useRef(null);
   
  

    // adding chats-------------->
    const [userChat , setuserChat] = useState({
        userName:"",
        chat:"",
        time: Timestamp.now(),
        currentuserUid: "",
        userAvatar:"",
    });

    async function userMessage(){
        let Userunique = JSON.parse(localStorage.getItem("userUid"));

        if(userChat.chat !== ""){
        setuserChat({...userChat, time:Timestamp.now()});
        let uniqueId = Userunique.uid;
        let name = Userunique.displayname;
        let image = Userunique.avatar;
        userChat.currentuserUid = uniqueId;
        userChat.userName = name;
        userChat.userAvatar = image;
        const response = collection(DB,"Chats");
        const data = await addDoc(response,userChat);
        }

        setuserChat({
            chat:"",
            time:Timestamp.now(),
            currentuserUid:"",
        })
        refDiv.current.scrollIntoView({behavior: "smooth"})
    }


    // User login------------------->
 

    async function SignIn(){
       
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth,provider);
        console.log(data);
        let flag = true;


        allUsers.map((items)=>{
          if(items.uid === data.user.uid){
          flag = false;
          }
        })

        let obj = {
            displayname : data.user.displayName,
            uid : data.user.uid,
            avatar: data.user.photoURL,
            email: data.user.email,
            time:Timestamp.now(),
        }

        if(flag){
        const response = collection(DB,"Users");
        const result = await addDoc(response,obj);
      }

      localStorage.setItem("userUid" , JSON.stringify(obj) )
      localStorage.setItem("chatwindow" , "true");
      setisUserlogin(prev=> !prev);
    
   
    }

    // Getting Chats of Users-------------------------->
    function getChats(){

        try{
            const q = query(
                collection(DB, 'Chats'),
                orderBy('time','asc')
            );
            onSnapshot(q,(QuerySnapshot =>{
             
              let reviewArray = [];
               QuerySnapshot.forEach((ele) => {
              
                   let obj = {
                    id : ele.id,
                    ...ele.data(),
                   }
                   reviewArray.push(obj);
               })
               setmessageArr(reviewArray);
            }))
          }catch(error){
            console.log(error);
          }

          setloadingchat(false);
        }


// Getting Users-------------------------->
       async function getUsers(){

        try{
            const q = query(
                collection(DB, 'Users'),
                orderBy('time')
            );
            onSnapshot(q,(QuerySnapshot =>{
             
              let reviewArray = [];
               QuerySnapshot.forEach((ele) => {
              
                   let obj = {
                    id : ele.id,
                    ...ele.data(),
                   }
                   reviewArray.push(obj);
               })
               setallUsers(reviewArray);
            }))
          
          }catch(error){
            console.log(error);
          }

          setloadingmembers(false);
        }


        useEffect(()=>{
            getChats();
            getUsers();
            
        },[])


        // important message------------------------->


        


        // Deleting message---------->


        function functionality(){
          
            setisDelete(!isDelete);
            setisstarmessage((prev)=> !prev);

          }

          async function DeleteChat(id,uId){

            const currentUid = JSON.parse(localStorage.getItem("userUid"))

            if(uId === currentUid.uid ){
                
              try {

                const res = collection(DB,"Chats");
                await deleteDoc(doc(res,id))
            setisDelete(!isDelete);

                
              } catch (error) {
                console.log(error);
              }

            }

          }

          // Logout functionality----------------------->

         async function LogoutUser(){

            const currentUser = JSON.parse(localStorage.getItem("userUid"));

            const deleteId = allUsers.filter((items)=> items.uid === currentUser.uid);

            if(currentUser){

            try {

              const res = collection(DB,"Users");
              await deleteDoc(doc(res,deleteId[0].id))
              localStorage.removeItem("userUid");
              
            } catch (error) {
              console.log(error);
            }
          }
          localStorage.setItem("chatwindow","false");
          setisUserlogin(prev=> !prev);

          }


  return (
    <MyContext.Provider value={{userChat,setuserChat,userMessage,SignIn,messageArr,refDiv,setisDelete,isDelete,functionality,allUsers,LogoutUser,DeleteChat,isstarmessage,loadingchat,loadingmembers,isUserlogin}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextApi