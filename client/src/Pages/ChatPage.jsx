import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats, setChats] = useState();

    async function fetchData(){
        const data = await axios.get('/api/chat');
        console.log(data);
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage