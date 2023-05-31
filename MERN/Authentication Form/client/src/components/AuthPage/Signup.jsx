import React, { useState } from 'react'
import { useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, Box } from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State/UserSlice';

const Signup = () => {
    const [showP, setShowP] = useState(false)
    const [showCP, setShowCP] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => setShowP(!showP)
    const handleClicks = () => setShowCP(!showCP)

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !cPassword) {
            toast({
                title: "Please fill all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }
        if (password !== cPassword) {
            toast({
                title: "Password doesn't match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post("http://localhost:3009/api/user", { name, email, password }, config);

            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token
                })
            );
            setLoading(false);
            navigate("/home");
        } catch (err) {
            setLoading(false);
            toast({
                title: err.response.data,
                status: "error",
                duration: 6000,
                isClosable: true,
                position: "bottom"
            });

            return;
        }
    }

    return (
        <VStack spacing="5px">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    autoComplete="off"
                    w="90%"
                    placeholder="Enter your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    autoComplete="off"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showP ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {showP ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showCP ? 'text' : 'password'}
                        placeholder="Confirm Your Password"
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClicks}>
                            {showCP ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme={"blue"}
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup