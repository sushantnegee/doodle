import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement,useToast,VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleClick = ()=>{
        setShow(!show);
    }
    const {setLoggedIn} = ChatState();

    const submiHandler = async ()=>{
    setLoading(true);
    if(!email || !password){
        toast({
            title: 'Please Fill all Fields',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          setLoading(false);
          return;
    }
    console.log('inside')
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        };
        console.log('inside config')

    const {data} = await axios.post("http://localhost:5000/api/user/login",{email,password},config);

        toast({
            title: 'Login Successfull',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          console.log("inside try");
          setLoggedIn(true);
          localStorage.setItem('userInfo',JSON.stringify(data));
          setLoading(false);
        //   history.push("/chats");
          navigate("/chats");
    }catch(error){
        toast({
            title: 'Error Occured',
            description:error.response.data.message,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:"bottom"
          })
          console.log('in error')
          console.log("error:",error)
          setLoading(false); 
    }
    }
    console.log(loading)
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
    <Button colorScheme={'blue'} width="100%" style={{marginTop:15}} isLoading={loading} onClick={submiHandler}>
        Login
    </Button>
  </VStack>;
};

export default Login;
