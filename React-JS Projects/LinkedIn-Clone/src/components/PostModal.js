import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postArticleAPI } from "../actions";


const PostModal = (props) => {

    //  text editor functionality on popup
    const [editorText, setEditorText ] = useState("");
    // functionality to share the image from computer on the poppop modal
    const [shareImage, setShareImage] = useState("");

    // functionality to share the video from local device
    const [videoLink, setVideoLink] = useState("");
     
    // asset area state 
    const [assetArea, setAssetArea] = useState("");

    //  handle the change when user import file and images on local
    const handleChange = (e) => {
    //get the first element on the files
    const image = e.target.files[0];
    // if you find any error so do this thing
    // if the image is black or image is undefined then those two cases we show a alert otherwise return
    if (image === "" || image === undefined) {
        //alert
        alert(`It is not an image, the file is a ${typeof image}`);
        // otherwise return
        return;
    }
    //And if we dont get any error then do this thing

    // and this will update the upper variable
    setShareImage(image);
    };

    // empty state of image and video  as argument
    //choose asset area and passes the image, video
    const swithchAssetArea = (area) => {
        setShareImage("");
        setVideoLink ("");
        setAssetArea(area);
    };

    // post article function

    const postArticle = (e) => {
        console.log("post malone :👍");
        e.preventDefault();

        if (e.target !== e.currentTarget)  {
            console.log("hello");
            return;
        }

    // define payload image
     const payload = {
        image: shareImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: firebase.firestore.Timestamp.now(),
    };

    //post article payload
    props.postArticle(payload);
    // and call this reset function below to reset everything when it is added
    reset(e);

     };

    //  reset the state of text editor when click on close button icon
    //means there is no popup open
    const reset = (e) => {
        setEditorText("");
        //add the blank function of image and video here
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    }
return (
    // wrap this all thing in the jsx fragment
    <>
    {/* if the props modal state is true so show me all this stuff */}
    {props.showModal === "open" && 
    <Container>
     <Content>
        <Header>
          <h2>Create a Post</h2>
          <button onClick={(event) => reset(event)}>
              <img src="/images/close-icon.svg" alt="Close" />
          </button>
        </Header>
        <SharedContent>
            {/* display the user info */}
            <UserInfo>
            {props.user.photoURL ? ( <img src={props.user.photoURL} /> 
            ) : (
            <img src="/images/user.svg" alt="Close" />
            )}
                <span>{props.user.displayName}</span>
            </UserInfo>
           <Editor>
                {/* onchange grab the value from the texteditor on the targetvalue */}
           <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder="What do you want to talk about?" autoFocus={true}>
           </textarea>
           {/* scugly brackets */}
           {/* if the assetsarea is image then do this  */}
           { assetArea  === "image"  ? (
           <UploadImage>
               <input type="file"
                accept="image/gif, image/jpeg, image/png" 
                name="image"
                 id="file"
                 //jsx inline styling
                 style={{display: "none"}}
                //  run the handle change function to set the image for us
                onChange={handleChange}
                 />
            <p>
            <label htmlFor="file"  style={{cursor: "pointer"}}>
             Select an Image to Share
            </label>
            </p>
            {/* if the image already exists then do this to show the import image on the poppop box*/}
            {shareImage && <img src={URL.createObjectURL(shareImage)} />}
            {/* for video upload */}
             {/* first add empty jsx fragment */}
             </UploadImage>
              ) : (
            //  and if assetarea is media then do all of this
             assetArea  === "media" && (
             <>
             <input type="text" 
             value={videoLink} 
            // take the event and set the video link based on whatever the user gives you the value of the event
             onChange={(e) => setVideoLink(e.target.value)} 
             placeholder="Please input a video link from browsers or your local" 
              />
            {/* if video link exist then import react player and set the inline style of jsx and the video url 
            whichever the video link has been set on the state at the movement*/}
            {videoLink && ( 
            <ReactPlayer width={'100%'} url={videoLink} />
            )}
             </>
             )
              )}
           </Editor>
        </SharedContent>
        <SharedCreation>
           <AttachAssets>
               <AssetButton onClick={() => swithchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="Share" />
               </AssetButton>
               <AssetButton onClick={() => swithchAssetArea("media")}>
                 <img src="/images/share-video.svg" alt="video" />
               </AssetButton>
               <AssetButton>
                 <img src="/images/share-file.svg" alt="file" />
               </AssetButton>
           </AttachAssets>
           <ShareComment>
           <AssetButton>
                 <img src="/images/share-comment.svg" alt="sharecomment" />
                 <span>Anyone</span>
               </AssetButton>
           </ShareComment>
           {/* disable a post button when user not filling any information on text editor */}
           {/* means true means disbale and false means not disable */}
           <PostButton disabled= {!editorText ? true: false} 
           onClick={(event) => postArticle(event)}>
             Post
           </PostButton>
        </SharedCreation>
        
     </Content>
    </Container>
    }
    </>

)

};

// container style
const Container = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 9999;
color: #121212;
background-color: rgba(0, 0, 0, 0.8);
animation: fadeIn 0.3s;
`;

// content style
const Content = styled.div`
position: relative;
display: flex;
flex-direction: column;
top: 72px;
width: 100%;
max-width:552px;
max-height: 90%;
background-color: #fff;
overflow: initial;
margin: 0 auto;
border-radius: 5px;
`;

// header style
const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 4px 20px;
font-size: 16px;
line-height: 1.5%;
border-bottom: 1px solid rgba(0, 0, 0, 0.15);
color: rgba(0, 0, 0, 0.6);
font-weight: 400;

h2 {
    
    font-size: 18px;
    line-height: 1.4;

}

button {
    width: 40px;
    height: 40px;
    min-width: auto;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.15);

    svg, 
    img {
        pointer-events: none;
    }
}
`;

// sharedcontent style
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

// userinfo style
const UserInfo = styled.div`
display: flex;
align-items: center;
padding: 12px 4px;

svg,
 img {
    width: 48px;
    height: 48px;
    border: 2px solid transparent;
    background-clip: content-box;
    border-radius: 50%;
}

span {
    margin-left: 5px;
    line-height: 16px;
    font-size: 16px;
    font-weight: 600;
}
`;

// sharedcreation style
const SharedCreation = styled.div`
display: flex;
justify-content: space-between;
padding: 12px 24px 12px 16px;
`;

// assetsbutton style
const AssetButton = styled.button`
display: flex;
align-items: center;
min-width: auto;
height: 40px;
background: transparent;
outline: none;
border: none;
cursor: pointer;
color: rgba(0, 0, 0, 0.5);

img {
    margin-right: 4px;
}
`;


// attachassests style
const AttachAssets = styled.div`
display: flex;
align-items: center;
padding-right: 8px;

${AssetButton} {
    width: 40px;
    margin-right: 10px;

}
`;

// sharecomment style
const ShareComment = styled.div`
margin-right: auto;
padding-left: 8px;
border-left: 1px solid rgba(0, 0, 0, 0.15);

span {
    font-size: 14px;
    font-weight: 500;
}

${AssetButton} {
    svg {
        margin-right: 5px;
    }
}
`;


// postbutton style
const PostButton = styled.button`
min-width: 60px;
padding-left: 16px;
padding-right: 16px;
border-radius: 20px;
/* this css will disabled the post button till the user are not type any text on editor */
background: ${(props)  => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : "#0a66c2" )};
color: ${(props)  => (props.disabled ? 'rgba(0, 0, 0, 0.3)' : "#fff" )};
cursor: pointer;
border: none;
outline: none;

&:hover {
    background: ${(props)  => (props.disabled ? 'rgba(0, 0, 0, 0.22)' : "#004182" )};
}
`;

// texteditor style
const Editor = styled.div`
padding: 12px 4px;

 textarea {
     width: 100%;
     min-height: 100px;
     resize: none;
     outline: none;
     border: none;
     cursor: text;
     font-size: inherit;
 }

 input {
     width: 100%;
     height: 35px;
     font-size: 16px;
     margin-bottom: 20px;
 }
`;



// upload style
const UploadImage = styled.div`
text-align: center;
font-weight: 500;
 img {
     width: 100%;
     height: 100%;
 }
`;

// store function of redux

//mapstate
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
      };
};

//mapdispatch
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});
  
    
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);



