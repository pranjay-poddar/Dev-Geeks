import styled from "styled-components";
import { connect } from "react-redux";
import { signOutAPI } from "../actions"

const Header = (props) => {

return (
   <Container>
       <Content>
        <Logo>
            <a href="/home" >
            <img src="/images/home-logo.svg" alt="homelogo" />
           </a>
        </Logo>
        <Search>
            <div>
            <input type="text" placeholder="search"/>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="search-icon"/>
            </SearchIcon>
            </div>
        </Search>
        <Nav>
          <NavListWrap>
             <NavList className="active">
               <a href="/home" >
                <img src="/images/nav-home.svg"  alt="nav-home-icon"/>
                <span>Home</span>
               </a>
             </NavList>
             <NavList>
               <a href="/network" >
                <img src="/images/nav-network.svg"  alt="nav-network-icon"/>
                <span>My Network</span>
               </a>
             </NavList>
             <NavList>
               <a href="/jobs" >
                <img src="/images/nav-jobs.svg"  alt="nav-jobs-icon"/>
                <span>Jobs</span>
               </a>
             </NavList>
             <NavList>
               <a href="/messaging" >
                <img src="/images/nav-messaging.svg"  alt="nav-messaging-icon"/>
                <span>Messaging</span>
               </a>
             </NavList>
             <NavList>
               <a href="/notifications" >
                <img src="/images/nav-notifications.svg"  alt="nav-notifications-icon"/>
                <span>Notifications</span>
               </a>
             </NavList>

             <User>
              <a>
                {/* user login photo come from google authentication */}
                {props.user && props.user.photoURL ? ( <img src={props.user.photoURL} alt={props.user.displayName} /> 
                ) : (
                  //if user photo is not existing the show the dummy image
                <img src="/images/user.svg" alt="" />
                )}
               <span>Me
               <img src="/images/down-icon.svg" alt="nav-down-icon" />
               </span>
              </a>
              <SignOut onClick={() => props.signOut()}>
               <a>SignOut</a>
              </SignOut>
             </User>
             <Work>
             <a href="/work">
               <img src="/images/nav-work.svg" alt="nav-work-icon" />
               <span>Work
               <img src="/images/down-icon.svg" alt="nav-down-icon" />
               </span>
              </a>
             </Work>
          </NavListWrap>
        </Nav>
       </Content>
   </Container>
)
}

// container style
const Container = styled.div`
background-color: #ffffff;
border-bottom: 1px solid rgba(0, 0, 0, 0.08);
left: 0;
top: 0;
width: 100vw;
padding: 0 24px;
position: fixed;
z-index: 100;
`;

// content style
const Content = styled.div`
display: flex;
max-width: 1128px;
min-height: 100%;
align-items: center;
margin: 0 auto;
`;

// logo style
const Logo = styled.span`
margin-right: 8px;
font-size: 0px;
`;

// search style
const Search = styled.div`
opacity: 1;
flex-grow: 1;
position: relative;

& > div {
    max-width: 280px; 

    input {
        border-radius: 2px;
        background-color: #eef3f8;
        border: none;
        box-shadow: none;
        color: rgba(0, 0, 0, 0.9);
        width: 218px;
        height: 34px;
        padding: 0 8px 0 40px;
        line-height: 1.75;
        font-weight: 400;
        font-size: 14px;
        border-color: #dce6f1;
        vertical-align: text-top;

    }
}
`;

// searchicon style
const SearchIcon = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 40px;
position: absolute;
z-index: 1;
top: 10px;
left: 2px;
border-radius: 0 2px 2px 0;
margin: 0;
pointer-events: 0;

`;

// navbar style
const Nav = styled.nav`
display: block;
margin-left: auto;

@media (max-width: 768px) {
position: fixed;
left: 0;
bottom: 0;
background: #fff;
width: 100%;  
}
`;


// navlistwrap style
const NavListWrap = styled.ul`
display: flex;
flex-wrap: nowrap;
list-style-type: none;

.active {
    span:after {
        content: '';
        transform: scaleX(1);
        border-bottom : 2px solid var(--white, #fff);
        bottom: 0;
        left: 0;
        position: absolute;
        transition: transform 0.2s ease-in-out;
        width: 100%;
        border-color: rgba(0, 0, 0, 0.9);

    }
}

@media (max-width: 768px) {
  overflow-X: scroll;
}
`;

// navlist style
const NavList = styled.li`
  display: flex;
  align-items: center;

  a{
      align-items: center;
      background: transparent;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-weight: 400;
      justify-content: center;
      line-height: 1.5;
      min-height: 52px;
      min-width: 80px;
      position: relative;
      text-decoration: none;

      span {
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
      }

      @media (max-width: 768px) {
          min-width: 70px;
      }
      
}

&:hover,
&:active {
    a {
        span{
            color: rgba(0, 0, 0, 0.9);
        }
    }
}
`;

// nav signout style
const SignOut = styled.div`
 position: absolute;
 top: 45px;
 background: #fff;
 border-radius: 0 0 5px 5px;
 width: 100px;
 height: 40px;
 font-size: 16px;
 transition-duration: 167ms;
 text-align: center;
 display: none;

 @media (max-width: 768px) {
  border-radius: 10px;
    right: 60px;
    top: -40px;
    cursor: pointer;
 }
`;

// nav user style
const User = styled(NavList)`
a > svg {
width: 24px;
border-radius: 50%;
}

a > img {
width: 24px;
height: 24px;
border-radius: 50%;
}

span {
    display: flex;
    align-items: center;
}

&:hover {
    ${SignOut} {
        align-items: center;
        justify-content: center;
        display: flex;
    }
}

`;

// nav work style
const Work = styled(User)`
border-left: 1px solid rgba(0, 0, 0, 0.08);
`;


// dispatch function for redux

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};


const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);