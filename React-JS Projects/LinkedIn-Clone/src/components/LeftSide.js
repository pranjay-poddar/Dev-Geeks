import styled from "styled-components";
import { connect } from "react-redux";


const LeftSide = (props) => {
 return (
   <Container>
    <ArtCard>
        <UserInfo>
         <CardBackground />
         <a>
             <Photo />
             {/* if the user exist so show there name otherwise show there with help of ternary operator */}
             <Link>Welcome, {props.user ? props.user.displayName : 'there'}</Link>
         </a>
          <a>
            <AddPhotoText>
                Add a Photo
            </AddPhotoText>
         </a>
        </UserInfo>
        <Widget>
            <a>
                <div>
                <span>Connections</span>
                <span>Grow your Network</span>
                </div>
                <img src="/images/widget-icon.svg" alt="widget-icon"/>
            </a>
        </Widget>
        <Item>
            <span>
                <img src="/images/item-icon.svg" alt="item-icon"/>
                My Items
            </span>
        </Item>
        </ArtCard>
        <CommunityCard>
           <a>
               <span>Groups</span>
           </a>
           <a>
               <span>Events
                   <img src="/images/plus-icon.svg" alt="plus-icon" />
               </span>
           </a>
           <a>
               <span>Follow Hashtags</span>
           </a>
           <a>
               <span>Discover More</span>
           </a>
        </CommunityCard>
   </Container>
 )

};

// container style
const Container = styled.div`
 grid-area: leftside;
`;

// artcard style
const ArtCard = styled.div`
 position: relative;
 text-align: center;
 overflow: hidden;
 margin-bottom: 8px;
 background-color: #fff;
 border-radius: 5px;
 transition: box-shadow 83ms;
 border: none;
 box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0  rgb(0 0 0 / 20%);

`;

// userinfo style
const UserInfo = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.15);
padding: 12px 12px 16px;
word-wrap: break-word;
word-break: break-word;
`;

// cardbackgroud style
const CardBackground = styled.div`
background: url("/images/card-bg.svg");
background-position: center;
background-size: 462px;
height: 54px;
margin: -12px -12px 0;
`;

// photo style
const Photo = styled.div`
box-shadow: none;
background-image: url("/images/photo.svg");
width: 72px;
height: 72px;
box-sizing: border-box;
background-clip: content-box;
background-color: #fff;
background-position: center;
background-repeat: no-repeat;
background-size: 60%;
border: 2px solid #fff;
margin: -38px auto 12px;
border-radius: 50%;
`;

// Link style
const Link = styled.div`
font-size: 16px;
color: rgba(0, 0, 0, 0.9);
line-height: 1.5;
font-weight: 700;
`;

// AddPhotoText style
const AddPhotoText = styled.div`
color: #0a66c2;
line-height: 1.33;
font-size: 12px;
font-weight: 700;
margin-top: 4px;
`;


// widget style
const Widget = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.15);
padding-top: 12px;
padding-bottom: 12px;

& > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding: 4px 12px;

    &:hover  {
        background-color: rgba(0, 0, 0, 0.08);
    }

    div {
        display: flex;
        flex-direction: column;
        text-align: left;

        span {
       font-size: 12px;
       line-height: 1.333;

       &:first-child {
           color: rgba(0, 0, 0, 0.6)
       }

       &:nth-child(2) {
           color: rgba(0, 0, 0, 1);
       }
        }
    }
} 

svg {
    color: rgba(0, 0, 0, 1);
}
`;

// item style
const Item = styled.a`
display: block;
border-color: rgba(0, 0, 0, 0.8);
text-align: left;
padding: 12px;
font-size: 12px;

span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);

    svg {
        color: rgba(0, 0, 0, 0.6);
    }
}

&:hover {
    background-color: rgba(0, 0, 0, 0.08);
}
`;

// communitycard style
const CommunityCard = styled(ArtCard)`
 display: flex;
 flex-direction: column;
 padding: 8px 0 0;
 text-align: left;

 a {
     color: black;
     padding: 4px 12px 4px 12px;
     font-size: 12px;

     &:hover {
         color: #0a66c2;
     }

     span {
         display: flex;
         align-items: center;
         justify-content: space-between;
     }

     &:last-child {
         color: rgba(0, 0, 0, 0.6);
         text-decoration: none;
         border-top: 1px solid #d6cec2;
         padding: 12px;

         &:hover {
         background-color: rgba(0, 0, 0, 0.08);
         }
    }
 }
`;
// on this app we are not using redux toolkit so we set the props manually of each state
// here we are going to tell redux about the state
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

//  not use dispatch because we are not using ant action of dispatch here

export default connect(mapStateToProps)(LeftSide)