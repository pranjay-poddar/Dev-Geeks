import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
const Coins = () => {
  const [coins, setCoins] = useState([]); // initally array is empty
  const [loading, setloading] = useState(true);
  const [Error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setloading(true); // because the component will render again as page dependency is passed in useEffect
  };
  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        ); // fetch coins
        // console.log(data);
        setCoins(data); // passing data in empty array
        setloading(false); // set loading to false when component is loaded sucessfully.
      } catch (Error) {
        setError(true);
        setloading(false);
      }
    };

    fetchCoins(); // function call
  }, [currency, page]); // refresh webpage when these value changes

  // if error is true then display this component
  if (Error) return <ErrorComponent message={"Error while fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Currency */}
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">EUR</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                price={i.current_price}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor="blackAlpha.900"
                color="white"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
