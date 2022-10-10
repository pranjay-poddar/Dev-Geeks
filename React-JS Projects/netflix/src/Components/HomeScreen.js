import React from 'react'
import Banner from './Banner'
import "./HomeScreen.css"
import Nav from './Nav.js'
import Row from './Row'
import requests from "./Requests"

const HomeScreen = () => {
  return (
    <div className="homeScreen">
        <Nav />
        <Banner />
        <Row title = "Trending" fetchURL= {requests.fetchTrending} isLargeRow />
        <Row title = "Netflix Orignals" fetchURL= {requests.fetchNetflixOriginals} />
        <Row title = "Top Rated" fetchURL= {requests.fetchTopRated} />
        <Row title = "Action Movies" fetchURL= {requests.fetchActionMovies} />
        <Row title = "Comedy Movies" fetchURL= {requests.fetchComedyMovies} />
        <Row title = "Romance Movies" fetchURL= {requests.fetchRomanceMovies} />
        <Row title = "Horror Movies" fetchURL= {requests.fetchHorrorMovies} />
        <Row title = "Documentaries" fetchURL= {requests.fetchDocumentaries} />
    </div>
  )
}

export default HomeScreen