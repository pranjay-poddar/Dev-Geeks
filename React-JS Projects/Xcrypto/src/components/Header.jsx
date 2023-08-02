import React from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Header = () => {
  // Hstack is similar to div. it is used to display content row-wise(horizontally) and display is bydefault flex with alignitems: center  
  return <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
    <Button variant={"unstyled"} color={"white"}>
      <Link to="/"> Home</Link>
    </Button>
    <Button variant={"unstyled"} color={"white"}>
      <Link to="/exchanges"> Exchanges</Link>
    </Button>
    <Button variant={"unstyled"} color={"white"}>
      <Link to="/coins"> Coins</Link>
    </Button>
  </HStack>
}

export default Header