import styled from "styled-components";


const RightSide = (props) => {
 return (
  <Container>
    <FollowCard>

     <Title>
       <h2>Add to your Feed</h2>
       <img src="/images/feed-icon.svg" alt="feed-icon" />
     </Title>

     <FeedList>
       <li>
         <a>
           <Avatar />
         </a>
         <div>
           <span>#Linkedin</span>
           <button>Follow</button>
         </div>
       </li>
       <li>
         <a>
           <Avatar />
         </a>
         <div>
           <span>#Website</span>
           <button>Follow</button>
         </div>
       </li>
     </FeedList>
     <Recommendation>
       View all Recommendation
       <img src="/images/right-icon.svg" alt="right-icon" />
     </Recommendation>
    </FollowCard>
    <BannerCard>
      <img src="/images/ad-images.jpg" alt="ad-images" />
    </BannerCard>
     <DevelopDesign>
      <h2>Design and Develop by Adarsh Tripathi</h2>
      <a href="https://github.com/adarshtiwari1998">Github Profile Link</a>
    </DevelopDesign>
  </Container>
 )

};

// container style
const Container = styled.div`
grid-area: rightside;
`;

// followcard style
const FollowCard = styled.div`
text-align: center;
overflow: hidden;
margin-bottom: 8px;
background-color: #fff;
border-radius: 5px;
position: relative;
border: none;
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
padding: 12px;
`;

// title style
const Title = styled.div`
display: inline-flex;
position: relative;
align-items: center;
justify-content: space-between;
font-size: 16px;
border-radius: 5px;
width: 100%;
color: rgba(0, 0, 0, 0.6);
`;

// feedList style
const FeedList = styled.div`
margin-top: 16px;

li {
  display: flex;
  position: relative;
  align-items: center;
  margin: 12px 0;
  font-size: 14px;
  & > div {
    display: flex;
    flex-direction: column;
  }

  button {
    max-height: 32px;
    max-width: 480px;
    display: inline-flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    text-align: center;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
    padding: 16px;
    font-weight: 600;
    outline: none;
    border-radius: 15px;
  }
}

`;

// FeedList style
const Avatar = styled.div`
background-image: url("/images/hashtag-image.svg");
background-size: contain;
background-position: center;
background-repeat: no-repeat;
width: 48px;
height: 48px;
margin-right: 8px;
`;


// recommedations style
const Recommendation = styled.a`
display: flex;
align-items: center;
color: #0a66c2;
font-size: 14px;

`;

// bannercard style
const BannerCard = styled(FollowCard)`
img {
  width: 100%;
  height: 100%;
}
`;

// designdevelop style
const DevelopDesign = styled(FollowCard)`
text-align: center;
`;


export default RightSide;