import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [pic, setPic] = useState("")
    const [loading,setLoading] = useState(false);

    const toast = useToast()
    // let history = useHistory();
    const navigate = useNavigate();
    const handleClick = ()=>{
        setShow(!show);
    }
    const postDetails =(pics)=>{
        setLoading(true);
        console.log('lol')
        if(pics===undefined){
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              return;
        }
        if(pics.type ==="image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","doodle-talk");
            data.append("cloud_name","dygq6pqie");
            fetch("https://api.cloudinary.com/v1_1/dygq6pqie/image/upload",{
                method:"post",
                body:data,
            })
            .then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString());
                // console.log(data)

                console.log(pic)
                setLoading(false);
            }).catch((err)=>{
                console.log("error :",err);
                setLoading(false);
            })
        }else{
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              setLoading(false);
              return;
        }
    }
    const submiHandler = async ()=>{
        // console.log('submit_handler')
        setLoading(true);
        if(!name || !email || !password || !confPassword){
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

        if(password!== confPassword){
            toast({
                title: 'Password is not Matching',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              setLoading(false);
              return;
        }

        try{
            const config = {
                headers:{
                    "Content-type":"application/json"
                }
            };

            const data = await axios.post("/api/user",{name,email,password,pic},config)
            toast({
                title: 'Registration Successfull',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })

              localStorage.setItem('userInfo',JSON.stringify(data));
              setLoading(false);
            //   history.push("/chats");
              navigate.push("/chats");
            
        }catch(error){
            toast({
                title: 'Error Occured',
                description:error.response.data.message,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position:"bottom"
              })
              console.log("error:",error)
              setLoading(false); 
        }
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
    <Button colorScheme={'blue'} width="100%" style={{marginTop:15}} isLoading={loading} onClick={submiHandler}>
        SignUp
    </Button>
  </VStack>
  )
}

export default Signup