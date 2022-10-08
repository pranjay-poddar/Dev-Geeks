import React from "react";

function Coin({ name, icon, price, symbol }) {
  return (
    <div>
      <div className="mt-6 bg-slate-800 p-5 rounded-lg  space-y-3 drop-shadow-xl text-white text-2xl grid place-items-center">
        <h1 className="font-bold underline">Name: {name} </h1>
        <img src={icon} alt="" className="coin-img" />
        <h3>Price: ${price}</h3>
        <h3>Symbol: {symbol}</h3>
      </div>
    </div>
  );
}

export default Coin;
