import { Box, Button, flexbox, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'
import {BiSearch} from 'react-icons/bi'

const SideDrawer = () => {
    
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
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
        <Button variant={'ghost'}>
        <BiSearch size={'1.3rem'}/>
        <Text display={{base:"none",md:"flex"}} px={"4"}>
            Search User
        </Text>
        </Button>
    </Tooltip >
    <Text fontSize="2xl" fontFamily="Work sans">
          Doodle-Talk
        </Text>
    </Box></>
  )
}

export default SideDrawer