import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { redirect } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);

//   const navigate = useNavigate();
  useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      
      setUser(userInfo);
      if (!userInfo) redirect("/");
  },[chats])
  console.log("context")
  return (
    <ChatContext.Provider value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
    }}>
        {children}
    </ChatContext.Provider>
  )
}



export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider