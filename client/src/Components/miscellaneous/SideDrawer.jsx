import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, flexbox, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { redirect, useNavigate } from 'react-router-dom';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
    
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    setSelectedChat,
    user,
    chats,
    setLoggedIn,
    setChats,
  } = ChatState();
  const navigate = useNavigate();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    setLoggedIn(false);
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`https://doodle-talk-backend.onrender.com/api/user?search=${search}`, config);
      console.log(data ,"=>search result")
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log("userId =>",userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(user.token);
      const { data } = await axios.post(`https://doodle-talk-backend.onrender.com/api/chat`, { userId }, config);
      console.log("data=>",data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log("yes here")
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      // setLoadingChat(false);
      console.log(error.message)
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  console.log(loadingChat)
  return (
    <>
    <Box 
    display={"flex"}
    justifyContent="space-between"
    w={'100'}
    bg="white"
    p={'5px 10px 5px 10px'}
    borderWidth="5px"
    >
    <Tooltip label="Search User to Chat" hasArrow placement='bottom'>
        <Button variant={'ghost'} onClick={onOpen}>
        <BiSearch size={'1.3rem'}/>
        <Text display={{base:"none",md:"flex"}} px={"4"}>
            Search User
        </Text>
        </Button>
    </Tooltip >
    <Text fontSize="2xl" fontFamily="Work sans">
          Doodle-Talk
    </Text>
    <div>
          <Menu>
            <MenuButton p={1}>
              
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler} >Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
    </Box>
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
              />
              <Button 
              onClick={handleSearch}
              >Go</Button>
            </Box>
            {loading ? (
              <ChatLoading/>
            ) : 
            (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )
            // <h1>lol</h1>
            }
            {loadingChat ? <Spinner ml="auto" d="flex" />:""}
          </DrawerBody>
        </DrawerContent>
      </Drawer></>
  )
}

export default SideDrawer