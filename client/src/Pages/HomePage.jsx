import React, { useEffect } from 'react'
import {Box, Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { redirect } from 'react-router-dom'

const HomePage = () => {
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) redirect("/chats");
},[])
  return (
    <Container maxW={'xl'} centerContent>
      <Box
    d={'flex'}
    justifyContent={'center'}
    p={3}
    bg={"white"}
    w={'100%'}
    m={'40px 0px 15px 0px'}
    borderRadius={'lg'}
    borderWidth={'1px'}
    >
        <Text textAlign={'center'} fontSize={'4xl'} fontFamily={'Work sans'} color={'black'}>Doodle-Talk</Text>
      </Box>
      <Box bg={'white'} w={'100%'} p={4} borderRadius={'lg'} borderWidth={'1px'}>
      <Tabs variant='soft-rounded' >
  <TabList mb={'1em'}>
    <Tab w={'50%'}>Login</Tab>
    <Tab w={'50%'}>SignUp</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
      
      </Container>
  )
}

export default HomePage