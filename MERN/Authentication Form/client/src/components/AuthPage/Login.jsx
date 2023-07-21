import React, { useState } from 'react'
import {
    useToast,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack
} from "@chakra-ui/react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setLogin } from '../../State/UserSlice';

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => setShow(!show)

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all the fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false);
            return;
        }

        try {
            const config = {
                "Conetnt-type": "application/json"
            };

            const { data } = await axios.post(
                "http://localhost:3009/api/user/login", { email, password }, config
            )

            toast({
                title: data.msg,
                status: "success",
                duration: 2000,
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
            naviagte("/home");

        } catch (err) {
            toast({
                title: err.response.data.error,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    }

    return (
        <VStack spacing="5px">
            <FormControl id="email-login" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="Enter your Email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password-login" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="Enter your Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
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
                Log In
            </Button>
        </VStack>
    )
}

export default Login