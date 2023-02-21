import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = ()=>{
        setShow(!show);
    }

    const submiHandler = ()=>{

    }
  return <VStack spacing={'5px'}>
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
    <Button colorScheme={'blue'} width="100%" style={{marginTop:15}} onClick={submiHandler}>
        Login
    </Button>
  </VStack>;
};

export default Login;
