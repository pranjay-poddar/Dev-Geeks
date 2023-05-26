import { Box, Button, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { setLogout } from '../State/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    });

    const logout = () => {
        dispatch(setLogout())
        toast({
            title: 'Logout Succesfully!',
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom"
        });
    }

    return (
        <Box pt={10} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Text px={10} pt={5} color='white'> This is HomePage</Text>

            <Text px={10} pt={5} color='white'> Here you can add any content</Text>

            <Button
                onClick={logout}
                mx={10}
                mt={5}
                colorScheme='red'
                _hover={{ bg: 'orange', w: '10%', h: '10vh', border: '2px solid white' }}
            >
                Sign out
            </Button>
        </Box >
    )
}

export default HomePage