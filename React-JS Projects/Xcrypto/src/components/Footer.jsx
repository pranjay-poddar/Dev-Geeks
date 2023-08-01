import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const AvatarSrc = "https://avatars.githubusercontent.com/u/86179288?v=4";
const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={48}
      px={"16"}
      py={["16", "8"]}
    >
      {/* for responsiveness we use stack instead of Hstack and Vstack */}
         <Stack direction={["column", "row"]} // responsiveness (dir of element will be column for small screen devices and row for large devices.) Note: pass value in array format
          h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            We are the best crypto trading app in India, we provide our guidance
            at a very affordable price.
          </Text>
          <Text fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}>Made By KRRISH</Text>
            <Link href="https://github.com/KRRISHSINGH08" isExternal>Github Profile <ExternalLinkIcon mx='2px' /> </Link>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={AvatarSrc} />
          <Text>KRRISHSINGH08</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
