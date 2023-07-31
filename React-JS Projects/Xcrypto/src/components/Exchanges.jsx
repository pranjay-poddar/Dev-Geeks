import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, VStack } from "@chakra-ui/react";
import Loader from "./Loader";
import { Image, Heading, Text } from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
const Exchanges = () => {
  const [exchanges, setexchanges] = useState([]); // initally array is empty
  const [loading, setloading] = useState(true);
  const [Error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        // console.log(data);
        setexchanges(data); // passing data in empty array
        setloading(false); // set loading to false when component is loaded sucessfully.
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };

    fetchExchanges(); // function call
  }, []);

  // if error is true then display this component
  if (Error)
    return <ErrorComponent message={"Error while fetching Exchanges"} />;

  return (
    // Container is use to wrap the content, elements inside it 
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      m={"4"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
