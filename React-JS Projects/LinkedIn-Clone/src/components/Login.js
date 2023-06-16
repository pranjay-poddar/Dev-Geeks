import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions"
import { Redirect } from "react-router-dom";
import "../styles/Login.css";

const Login = (props) => {
 
    return (
      
       <Container>
           {/* use for redirect the user after google login */}
           {props.user && <Redirect to="/home" />}
           <Nav>
               <a href="#" >
               <img src="/images/login-logo.svg"  alt="login-logo"/>
               </a>
               <div>
                   <Join>Join Now</Join>
                   <SignIn onClick={() => props.signIn()}>SignIn</SignIn>
               </div>
           </Nav>
           <Section> 
            <Hero>
             <h1>Welcome to your professional community</h1>
             <img src="/images/hero-image-v2.svg" alt="login-hero-image" />
           </Hero>
             <Form>
              <Google onClick={() => props.signIn()}>
               <img src="/images/google.svg" alt="google-button" />
               Sign in with Google
              </Google> 
            </Form>
         </Section>
         <SectionJobsFinder> 
             <SearchCta>
                 <JobsFinderCta>
                 <JobsFinderCtaHeader>
               Find open jobs and internships
               </JobsFinderCtaHeader>
                 </JobsFinderCta>
           <SuggestedSearch>
               <SeeMoreLessListMain>
               <SeeMoreLessListHeader>
               <p>RECOMMENDED JOBS FOR YOU</p>
               </SeeMoreLessListHeader>
               <SeeMoreLessList>
                   <ul className="seemorelesslist ul">
                       <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                               Engineering
                           </a>
                           
                       </li>
                       <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Business Development
                           </a>
                           
                       </li>
                       <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Finance
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Administrative Assistant
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Retail Associate
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Customer Service
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Operations
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Information Technology
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Marketing
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Human Resources
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Real Estate
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Real Estate
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Entrepreneurship
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                           Entrepreneurship
                           </a>
                          </li>
                          <li className="seemorelesslist li">
                           <a className="seemorelesslist a">
                          Research
                           </a>
                          </li>
                   </ul>
                </SeeMoreLessList>
               </SeeMoreLessListMain>
           </SuggestedSearch>
             </SearchCta>
         </SectionJobsFinder>
      <SectionTalentedFinder>
     <TalentedFinder>
            <TalentedFinderHeader>
                Post your job and find the people you need
            </TalentedFinderHeader>
            <TalentedFinderPostJobs>
            <a>
             Post a job
             </a>
            </TalentedFinderPostJobs>
        </TalentedFinder>
     </SectionTalentedFinder>
     <SectionProductCta>
    <ProductCta>
    <PeopleCta>
    <img class="people-cta__illustration flip-rtl lazy-loaded" 
    alt="Connect with people who can help" 
    aria-hidden="true" 
    src="https://static-exp1.licdn.com/sc/h/b1fxwht7hdbeusleja7ciftsj" />
    <PeopleCtaContent>
    <h2>Connect with people who can help</h2>
    <a>Find People You know</a>
    </PeopleCtaContent>
     </PeopleCta>
    <LearningCta>
    <img class="people-cta__illustration flip-rtl lazy-loaded" 
    alt="Connect with people who can help" 
    aria-hidden="true" 
    src="https://static-exp1.licdn.com/sc/h/dkfub4sc7jgzg3o31flfr91rv" />
    <LearningCtaContent>
    <h2>Learn the skills that can help you now</h2>
    <a>Choose a Topic to Learn About 
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="artdeco-icon lazy-loaded" focusable="false"><path d="M5 9h14l-6.2 6.7c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3L5 9z" fill="rgba(0, 0, 0, 0.6)"></path></svg></span>
    </a>
    </LearningCtaContent>
    </LearningCta>
    </ProductCta>
</SectionProductCta>
    <SectionJoinOurLinkedinCommunity>
     <JoinOurLinkedinCommunity>
         <JoinOurLinkedinHeader>
             <h2> Join your colleagues, classmates, and friends on LinkedIn.</h2>
        </JoinOurLinkedinHeader>
         <JoinOurLinkedinGetStarted>
            Get Started
         </JoinOurLinkedinGetStarted>
     </JoinOurLinkedinCommunity>
     </SectionJoinOurLinkedinCommunity>
     </Container>
    
  )
};

// container style
const Container = styled.div`
 padding: 0;
`;

// nav style
const Nav = styled.nav`
   display: flex;
   position: relative;
   flex-wrap: nowrap;
   justify-content: space-between;
   align-items: center;
   max-width: 1128px;
   padding: 12px 0 16px;
   margin: auto;
   
   & > a {
     width: 135px;
     height: 34px;
    
     @media (max-width: 768px) {
         padding: 0 5px;
     }
   }
`;


// join style
const Join = styled.a`
font-size: 16px;
padding: 18px 12px;
text-decoration: none;
margin-right: 12px;
border-radius: 4px;
font-weight: 500;
color: rgba(0, 0, 0, 0.6);

&:hover {
background-color: rgba(0, 0, 0, 0.08);
color: rgba(0, 0, 0, 0.9);
border-radius: 4px;
text-decoration: none;
}
`;

// signin style
const SignIn = styled.a`
box-shadow: inset 0 0 0 1px #0a66c2;
color: #0a66c2;
border-radius: 24px;
transition-duration: 167ms;
font-size: 16px;
font-weight: 600;
line-height: 40px;
padding: 10px 24px;
cursor: pointer;
text-align: center;
background-color:rgba(0, 0, 0, 0);

&:hover {
   background-color:rgba(112, 181, 249, 0.15);
   color: #0a66c2;
   text-decoration: none
}
`;

// section style
const Section = styled.section`
display: flex;
flex-wrap: wrap;
position: relative;
align-items: center;
align-content: start;
padding-bottom: 138px;
-webkit-box-align: center;
padding-top: 40px;
width: 100%;
max-width: 1128px;
min-height: 700px;
margin: auto;
padding: 60px 0;

@media (max-width: 768px) {
    margin: auto;
    max-width: 100vw;
    min-height: 0px;
}
`;

// Hero style
const Hero = styled.div`
width: 100%;
h1 {
    padding-bottom: 0;
    width: 56%;
    font-size: 56px;
    font-family: sans-serif;
    color: #2977c9;
    font-weight: 500;
    line-height: 70px;

    @media (max-width: 768px) {
        text-align: center;
        font-size: 32px;
        width: unset;
        line-height: 40px;
        padding-bottom: 12px;
    }
}

img {
z-index: 1;
width: 700px;
height: 670px;
position: absolute;
bottom: 156px;
right: -150px;
overflow: hidden;

@media (max-width: 768px){
    top: 230px;
    /* min-width: 374px; */
    width: 320px;
    position: initial;
    height: 240px;
    bottom: calc(-64px);
    /* height: 240px;
    min-width: 374px;
    position: absolute;
    bottom: calc(-64px); */
}
}
`;

const Form = styled.div`
margin-top: 100px;
width: 408px;
@media (max-width: 768px) {
    margin-top: 20px
}
`;
const Google = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color:#fff;
height: 56px;
width:100%;
cursor: pointer;
border-radius: 28px;
box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), 
inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
vertical-align: middle;
z-index: 0;
transition-duration: 167ms;
font-size: 20px;
color: rgba(0, 0, 0, 0.60);
&:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
}
`;


// css for second section
// sectionjobfinder css
const SectionJobsFinder = styled.section`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1128px;
    /* min-height: 840px; */
    padding: 60px 0;
    position: relative;
    margin: auto;
    min-height: 0;

    @media (max-width: 768px) {
    margin: auto;
    max-width: 100vw;
    min-height: 0px;
    padding: 56px 3px;
    }
 
`;
// searchcta style
const SearchCta = styled.div`
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;

    @media (max-width: 768px) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}

`;
// jobsfindercta style
const JobsFinderCta = styled.div`
   min-width: 408px;
    margin-right: 72px;
    -ms-flex-item-align: start;
    align-self: flex-start;

    @media (max-width: 768px) {
    min-width: 100%;
    margin: 0 0 24px 0;
    }
`;

// jobsfinderctaheader style
const JobsFinderCtaHeader = styled.h2`
    font-size: 50px;
    line-height: 1.16667;
    font-weight: 400;
    color: rgba(0,0,0,0.9);
    line-height: 60px;

    @media (max-width: 768px) {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    }

`;


// suggested style
const SuggestedSearch = styled.div`
    width: 100%;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    -ms-flex-item-align: start;
    align-self: flex-start;
`;

// seemorelesslistmain style
const SeeMoreLessListMain = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
`;

// SeeMoreLessListHeader style
const SeeMoreLessListHeader = styled.div`
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
    text-transform: uppercase;
    line-height: 20px;
    margin-bottom: 20px;
`;
// SeeMoreLessList style
const SeeMoreLessList = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;

    ul {
        display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 15px;
    }

    li {
        text-align: left;
        list-style-type: none;
    }

    a {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    min-height: 56px;
    height: auto;
    width: auto;
    float: left;
    background-color: rgba(0,0,0,0.08);
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 28px;
    padding: 8px 20px;
    margin-bottom: 12px;
    margin: 0 6px 8px 0;
    vertical-align: middle;
    z-index: 0;
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    -webkit-transition-property: background-color,color,-webkit-box-shadow;
    -webkit-transition-duration: 167ms;
    position: relative;
    overflow: hidden;
    outline-width: 2px;
    -webkit-box-sizing: border-box;
    border: 0;
    &:hover {
        background-color: rgba(0,0,0,0.22);
    }
    }
`;


//css for third Section
//section talendted finder css
const SectionTalentedFinder = styled(SectionJobsFinder)`
`;
// talendted finder style
const TalentedFinder = styled.div`
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 70px 0;

    @media (max-width: 768px) {
        -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding: 56px 16px;
    }
 
`;
// talendted finder header style
const TalentedFinderHeader = styled.h2`
    width: calc(408px + 5px);
    margin-right: calc(72px - 5px);
    font-size: 42px;
    line-height: 1.2;
    font-weight: 400;
    color: #B24020;
    line-height: 50px;

    @media (max-width: 768px) {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    width: unset;
    margin-bottom: 24px;
    }
    
`;

// talendted finder post jobs style
const TalentedFinderPostJobs = styled.a`
    font-size: 20px;
    border: solid 1px rgba(0,0,0,0.6);
    background: transparent;
    line-height: 1.4;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    min-height: 56px;
    height: auto;
    width: auto;
    float: left;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 28px;
    -webkit-box-sizing: border-box;
    padding: 8px 20px;
    margin-bottom: 12px;

    &:hover {
        background-color: rgba(0,0,0,0.22);
    }
 
`;

//css for Fourth Section
//section sectionproductcta css
const SectionProductCta = styled(SectionTalentedFinder)`
min-height: 0;
`;

//section productcta css
const ProductCta = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 60px 0;

    @media (max-width: 768px) {
        -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    }

`;

//section peoplecta css
const PeopleCta = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 100%;
    margin-right: 16px;

    @media (max-width: 768px) {
        width: 100%;
    margin: 0 0 56px;
    }

    img {
        -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    height: auto;
    max-width: 300px;
    margin: 0 72px 56px 0;

    @media (max-width: 768px) {
        max-width: 240px;
    margin-bottom: 32px;
    height: 192px;
    }
    }
`;
//section peoplecontent css
const PeopleCtaContent = styled.div`
    width: 456px;
    margin: auto 0;

    @media (max-width: 768px) {
        width: 100%;
      }

    h2 {
    font-size: 48px;
    line-height: 1.16667;
    font-weight: 400;
    color: rgba(0,0,0,0.9);
    font-family: sans-serif;
    line-height: 60px;
    font-weight: 200;
    margin-bottom: 40px;

    @media (max-width: 768px) {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 24px;
    }
    
}

a {
    font-size: 20px;
    border: solid 1px rgba(0,0,0,0.6);
    background: transparent;
    line-height: 1.4;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    min-height: 56px;
    -webkit-box-sizing: border-box;
    height: auto;
    width: auto;
    float: left;
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 28px;
    padding: 8px 20px;
    margin-bottom: 12px;

    @media (max-width: 768px) {
        min-height: 48px;
    }
}
`;

//learningcta
const LearningCta = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 100%;
    margin-right: 16px;
    @media (max-width: 768px) {
        width: 100%;
    margin: 0 0 56px;
    }

    :last-child {
        margin-right: 0;

        @media (max-width: 768px) {
            margin-bottom: 8px;
        }
    }

    img {
        -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    height: auto;
    max-width: 300px;
    margin: 0 72px 56px 0;
    @media (max-width: 768px) {
        max-width: 240px;
    margin-bottom: 32px;
    height: 192px;
    }
    }
`;

const LearningCtaContent = styled.div`
    width: 456px;
    margin: auto 0;

    @media (max-width: 768px) {
        width: 100%;
    }

    h2 {
    margin-bottom: 40px;
    font-size: 48px;
    line-height: 1.16667;
    font-weight: 400;
    color: rgba(0,0,0,0.9);
    font-family: sans-serif;
    line-height: 60px;
    font-weight: 200;

    @media (max-width: 768px) {
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 24px;
    }
    }
    a {
    font-size: 20px;
    border: solid 1px rgba(0,0,0,0.6);
    background: transparent;
    line-height: 1.4;
    font-weight: 600;
    color: rgba(0,0,0,0.6);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    min-height: 56px;
    -webkit-box-sizing: border-box;
    height: auto;
    width: 360px;
    max-width: 100%;
    float: left;
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 5px;
    padding: 8px 20px;
    margin-bottom: 12px;

    @media (max-width: 768px){
        min-height: 48px;
    }
}
span {
    width: 24px;
    height: 24px;
    margin-left: 8px;

}
`;



//css for Fifth Section
//sectionjoinourlinkedincommunity css
const SectionJoinOurLinkedinCommunity = styled(SectionTalentedFinder)`
min-height: 840px;

@media (max-width: 768px) {
    max-width: 100vw;
    min-height: 0;
}
`;

//joinourlinkedincommunity css
const JoinOurLinkedinCommunity = styled.div`
    width: 100%;
    -ms-flex-item-align: start;
    align-self: flex-start;

    @media (max-width: 768px) {
   height: 100%;
    padding: 0;
    }

    ::after {
    right: calc((0px - 100vw) / 12);
    content: '';
    width: 100vw;
    position: absolute;
    height: 842px;
    z-index: -1;
    background: url("https://static-exp1.licdn.com/sc/h/2vt8plqbv2l2pi6kxm89bqs59") repeat-x bottom/auto 100%;
    bottom: 0;

    @media (max-width: 768px) {
        display: none;
    }
    }
`;

//section joinourlinkedinheader css
const JoinOurLinkedinHeader = styled.div`
    width: 100%;
    -ms-flex-item-align: start;
    align-self: flex-start;

   @media (max-width: 768px){
    height: 100%;
    padding: 0;
    width: 100%;
}
   
   h2 {
    font-size: 58px;
    color: #2977c9;
    font-weight: 200;
    font-family: sans-serif;
    line-height: 70px;
    margin: 20px 0 40px 0;
    word-break: keep-all;

    @media (max-width: 768px) {
        font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    margin-bottom: 24px;
    }
 }
`;

//section joinourlinkedinhgetstarted css
const JoinOurLinkedinGetStarted = styled(TalentedFinderPostJobs)`
    background-color: #0a66c2;
    font-weight: normal;
    color: #fff;
    border: none;
    outline: none;
    

    &:hover {
        background-color: rgba(0, 65, 130);
    }
`;









// rudux section start
const mapStateToProps = (state) => {
return{
    //user state is redirecting to home page
    user: state.userState.user,
};
};

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAPI()),
});


// rudux section end
export default connect(mapStateToProps, mapDispatchToProps)(Login);
