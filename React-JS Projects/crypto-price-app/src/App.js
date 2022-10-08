import axios from "axios";
import { useEffect, state, useState } from "react";
import "./App.css";
import Coin from "./components/coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    axios
      .get("https://api.coinstats.app/public/v1/coins?skip=0&currency=USD")
      .then((response) => {
        setListOfCoins(response.data.coins);
      });
  }, []);

  const filterCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div>
      <header className="bg-yellow-400 h-40 text-center">
        <input
          type="text"
          className="drop-shadow-xl mt-12 rounded-md w-80 h-8 font-League Spartan coininput"
          placeholder="Search coins..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </header>
      <div className="App">
        <div className="display">
          {filterCoins.map((coin) => {
            return (
              <div>
                <Coin
                  name={coin.name}
                  icon={coin.icon}
                  price={coin.price}
                  symbol={coin.symbol}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <p className="text-black">Made with ❤️ by Kirtan</p>
      </div>
    </div>
  );
}

export default App;
