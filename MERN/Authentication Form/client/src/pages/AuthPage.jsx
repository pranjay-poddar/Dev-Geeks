import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/AuthPage/Login'
import Signup from '../components/AuthPage/Signup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Auth = () => {
    const navigate = useNavigate();

    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <Container maxW="xl" centerContent>
            <Box
                boxShadow={'dark-lg'}
                bg="white"
                w="100%"
                p={4}
                mt={10}
                borderRadius="lg"
                borderWidth="1px"
                color="black"
            >
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Auth