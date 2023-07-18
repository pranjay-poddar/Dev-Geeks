var btc = document.getElementById("bitcoin");
var eth = document.getElementById("ethereum");
var tet = document.getElementById("tether");
var bNb = document.getElementById("bnb");


var liveprice = 
{
  "async": true,
  "scroosDomain": true,
  "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cbnb&vs_currencies=usd",
  "method": "GET",
  "headers": {}
}

$.ajax(liveprice).done(function(response){
    console.log(response);
    btc.innerHTML = response.bitcoin.usd;
    eth.innerHTML = response.ethereum.usd;
    tet.innerHTML = response.tether.usd;
    bNb.innerHTML = response.bnb.usd;
});

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
  .then(response => response.json())
  .then(data => {
    const bitcoinPrice = data.bitcoin.usd;
    const bitcoinPriceElement = document.getElementById("bitcoin");
    if (bitcoinPriceElement) {
      bitcoinPriceElement.innerHTML = bitcoinPrice.toFixed(2);
    }
  })
  .catch(error => console.error(error));

// Get the current Ethereum price from the Coingecko API and update the Ethereum span element
fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
  .then(response => response.json())
  .then(data => {
    const ethereumPrice = data.ethereum.usd;
    const ethereumPriceElement = document.getElementById("ethereum");
    if (ethereumPriceElement) {
      ethereumPriceElement.innerHTML = ethereumPrice.toFixed(2);
    }
  })
  .catch(error => console.error(error));

// Get the current Tether price from the Coingecko API and update the Tether span element
fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd")
  .then(response => response.json())
  .then(data => {
    const tetherPrice = data.tether.usd;
    const tetherPriceElement = document.getElementById("tether");
    if (tetherPriceElement) {
      tetherPriceElement.innerHTML = tetherPrice.toFixed(2);
    }
  })
  .catch(error => console.error(error));

// Get the current Binance Coin price from the Coingecko API and update the Binance Coin span element
fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd")
  .then(response => response.json())
  .then(data => {
    const bnbPrice = data.binancecoin.usd;
    const bnbPriceElement = document.getElementById("bnb");
    if (bnbPriceElement) {
      bnbPriceElement.innerHTML = bnbPrice.toFixed(2);
    }
  })
  .catch(error => console.error(error));
