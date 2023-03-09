import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';

const GroupChatModal = ({children}) => {
    const [groupChatName,setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState();
    const [search,setSearch] = useState();
    const [searchResult,setSearchResult] = useState()
    const [loading,setLoading] = useState()

    const toast = useToast();

    const {user,chats,setChats}=ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSearch= async (query)=>{
        if (!query) {
            return;
          }
      
          try {
            setLoading(true);
      
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
      
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            console.log("search result group model =>",data)
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
    }
    const handleGroup=(value)=>{

    }
    const handleSubmit=(value)=>{

    }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={'35px'} fontFamily={'Work sans'} display={'flex'} justifyContent={'center'}>Creat Group Chats</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDir="column" alignItems={"center"} >
            <FormControl>
                <Input placeholder='Chat Name' mb="3" onChange={(e)=>{setGroupChatName(e.target.value)}}/>
            </FormControl>
            <FormControl>
                <Input placeholder='Add Users eg: sushant, nishant etc' mb="3" onChange={(e)=>{handleSearch(e.target.value)}}/>
            </FormControl>
            {loading?<Spinner/>:
          searchResult?.slice(0,4).map((elem)=>{
            return <UserListItem key={elem._id} user = {elem} handleFunction={handleGroup}/>
          })
          }
          </ModalBody >
          
          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal