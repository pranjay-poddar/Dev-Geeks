
import { useState,useEffect } from 'react';
import './App.css';
import Navinshort from './components/Navinshort';
import NewsContent from './components/NewsContents/NewsContent';
import axios from 'axios';
// import apikey from './data/config';
import Footer from './components/Footer/footer';
function App() {

const [category, setcategory] = useState("general");
const [newsArray, setNewsArray]=useState([]);
const [newsResults, setNewsResults]=useState();
const [loadMore, setLoadMore] = useState(20);


//https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json
//https://saurav.tech/NewsAPI/
//https://${proxyUrl}newsapi.org/v2/top-headlines?country=in&apiKey=f88288f4bca14599a2334cadfb3d6f4b&pageSize=${loadMore}&category=${category}
const newsApi= async () =>{
  try {
    const proxyUrl="https://cors-anywhere.herokuapp.com/";
    
    const news=await axios.get(`https://${proxyUrl}newsapi.org/v2/top-headlines?country=in&apiKey=f88288f4bca14599a2334cadfb3d6f4b&pageSize=${loadMore}&category=${category}`);

  setNewsArray(news.data.articles)
  setNewsResults(news.data.totalResults)

  } catch (error) {
    console.log(error)
  }
}

// console.log(newsArray)

useEffect(() => {
   newsApi();
    // eslint-disable-next-line
}, [newsResults,category,loadMore])



  return (
    <div className="App">
      <Navinshort setcategory={setcategory} />
      <NewsContent setLoadMore={setLoadMore} loadMore={loadMore} newsArray={newsArray} newsResults={newsResults}/>
      <Footer></Footer>

    </div>
  );
}

export default App;
