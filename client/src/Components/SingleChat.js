import React, { useState } from "react";
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



const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState([])
  const [loading,setLoading] = useState(false)


  const { user, selectedChat, setSelectedChat } = ChatState();

  const sendMessage = ()=>{

  }
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
              fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
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
            />:(<div>Messages</div>)}
            <FormControl onKeyDown={sendMessage} mt="3" isRequired>
              <Input
              variant={'filled'}
              bg='#E0E0E0'
              placeholder="Enter a message.."
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
