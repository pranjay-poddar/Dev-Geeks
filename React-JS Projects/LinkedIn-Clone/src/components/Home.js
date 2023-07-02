import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Main from "./Main";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {

return (
    <Container>
        {!props.user && <Redirect to="/" />}
        <Content>
        <Section>
            <h5>
            <a>Hiring in a hurry?-</a>
            </h5>
            <p> Find Talented Pros in record time with upwork and 
                keep business moving</p>
        </Section>
        <Layout>
            <LeftSide />
             <Main />
             <RightSide />
             </Layout>
        </Content>
    </Container>
)
};

// container style
const Container = styled.div`
padding-top: 52px;
max-width: 100%;
`;

// content style
const Content = styled.div`
max-width: 1078px;
margin-left: auto;
margin-right: auto;
`;
// section style
const Section = styled.section`
min-height: 50px;
padding: 16px 0;
box-sizing: content-box;
text-align: center;
display: flex;
justify-content: center;
text-decoration: underline;

h5 {
    color: #0a66c2;
    font-size: 14px;

    a {
        font-weight: 700;
    }
}

p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
}

@media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;

}
`;

// layout style
const Layout = styled.div`
display: grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
column-gap: 25px;
row-gap: 25px;
grid-template-rows: auto;
margin: 25px 0;

@media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
}
`;

// on this app we are not using redux toolkit so we set the props manually of each state
// it update the current user state, user login, signin or signout on redux
const mapStateToProps = (state) => {
return {
    user: state.userState.user,
};
};

//  not use dispatch because we are not using ant action of dispatch here

export default connect(mapStateToProps)(Home);