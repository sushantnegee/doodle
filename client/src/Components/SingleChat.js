import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getFullSender, getSender } from "../Config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";



const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState('')
  const [loading,setLoading] = useState(false)


  const toast = useToast();
  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log("fetched message data =>",data)
      console.log(messages)
      setMessages(data);
      setLoading(false);

    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");  
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        console.log("sent message data =>",data)
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e)=>{
    setNewMessage(e.target.value);
  }

  useEffect(() => {
    fetchMessages();

  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {
              !selectedChat.isGroupChat?<>
              {getSender(user,selectedChat.users)}
              <ProfileModal user= {getFullSender(user,selectedChat.users)}/>
              </>
              :<>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupChatModal
              fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}
              />
              </>
            }
          </Text>
          <Box
           display="flex"
           flexDir="column"
           justifyContent="flex-end"
           p={3}
           bg="#E8E8E8"
           w="100%"
           h="100%"
           borderRadius="lg"
           overflowY="hidden"
          >
            {loading?<Spinner
            // alignSelf={'center'} 
            margin={'auto'}
            size={'xl'}
            />:(<div>
              <ScrollableChat messages={messages}/>
            </div>)}
            <FormControl onKeyDown={sendMessage} mt="3" isRequired>
              <Input
              variant={'filled'}
              bg='#E0E0E0'
              placeholder="Enter a message.."
              onChange={typingHandler}
              value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          h="100%"
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
            Click on a user To start a Chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
