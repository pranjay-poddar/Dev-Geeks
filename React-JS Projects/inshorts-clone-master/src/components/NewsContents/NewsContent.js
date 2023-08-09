import { Container } from '@mui/material';
import React from 'react'
import './NewsContent.css'
import NewsCard from '../NewsCard/NewsCard';
export const NewsContent = ({ newsArray, newsResults,  loadMore, setLoadMore }) => {
  return (
    <Container maxWidth="md">



      <div className='content'>
        <div className='downloadMessage'>
          <span className='downloadText'>
            For the best experience use inshorts app on your smartphone
          </span>
          <img
            src="https://assets.inshorts.com/website_assets/images/appstore.png"

            height="80%"
            alt="app store"
          />



          <img
            style={{ marginLeft: "2rem" }}
            src="https://assets.inshorts.com/website_assets/images/playstore.png"
            height="80%"
            alt="play store"
          />

        </div>
        {
          newsArray.map((newsItem) => (
            <NewsCard newsItem={newsItem} key={newsItem.title} />
          ))
        }
        {loadMore <= newsResults && (
          <>
            <hr />
            <button className='loadMore'  onClick={() => setLoadMore(loadMore + 20)}>Load More</button>
          </>

        )}


      </div>



    </Container>
  )
}

export default NewsContent;