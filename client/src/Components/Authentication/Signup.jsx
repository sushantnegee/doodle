import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [pic, setPic] = useState("")

    const handleClick = ()=>{
        setShow(!show);
    }
    const postDetails =(pics)=>{

    }
    const submiHandler = ()=>{

    }
  return (
    <VStack spacing={'5px'}>
    <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}/>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)}/>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input type={show?'text':'password'} placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
        <InputRightElement width={'4.5rem'}>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show?"Hide":"Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>
    <FormControl isRequired>
        <FormLabel>confirm Password</FormLabel>
        <InputGroup>
        <Input type={show?'text':'password'} placeholder="Enter password" onChange={(e)=>setConfPassword(e.target.value)}/>
        <InputRightElement width={'4.5rem'}>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show?"Hide":"Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>
    <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type={'file'} p={1.5} accept={'image/*'} onChange={(e)=>postDetails(e.target.files[0])}/>
    </FormControl>
    <Button colorScheme={'blue'} width="100%" style={{marginTop:15}} onClick={submiHandler}>
        SignUp
    </Button>
  </VStack>
  )
}

export default Signup