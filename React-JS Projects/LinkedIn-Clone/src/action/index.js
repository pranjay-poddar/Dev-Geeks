import { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";
import db from "../firebase";

// this is for save  the user authentication information into redux on the browsers
export const setUser = (payload) => ({
   type: SET_USER,
   user: payload,
});

 
// SET_LOADING_STATUS
export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

// set article statuses

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
});


export function signInAPI() {
return (dispatch) => {
   auth.signInWithPopup(provider).then((payload) => { 
    // console.log(payload.user);
    dispatch(setUser(payload.user));
    }).catch((error) => alert(error.message)); 
};
}


// authentication information

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
        if (user) {
            dispatch(setUser(user));
        }
        })
    }
};


// signout functionality come from firebase

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        });
    };
}

//this help to upload the image to the firebase and helpful for loading bar
export function postArticleAPI (payload) {
    return (dispatch) => {
          //loading bar start
        dispatch(setLoading(true));

        //loading bar end
        if (payload.image != "") {
            const upload = storage.ref(`images/${payload.image.name}`)
            .put(payload.image);
            //upload images to firebase
            upload.on("state_changed",
            (snapshot) => { 
                const progress = (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            //progress bar
            console.log(`progress: $(progress)%`);

            if (snapshot.state === "RUNNING") {
            console.log(`progress: $(progress)%`);
            }
         } , (error) => console.log(error.code), 
         //download url
         async () => {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            //db collection for images
            db.collection("articles").add ({
                actor: {
                    description: payload.user.email,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL
                },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
            });
            // finish the loading here
            dispatch(setLoading(false));
        }
        );
    }
    // db collection for video 
    else if (payload.video) {
        db.collection("articles").add ({
            actor: {
                description: payload.user.email,
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL
            },
                video: payload.video,
                sharedImg: "",
                comments: 0,
                description: payload.description,
        });
         // finish the loading here
         dispatch(setLoading(false));
    }
};
}


// fetch the article on main content area from firebase by using useeffect
export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
    //  fetch data from database
    db.collection("articles").orderBy("actor.date", "desc")
    // this allow to retain data from firebase
    .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) =>  doc.data());
        // console.log(payload);
        //show articles on frontend by this
        dispatch(getArticles(payload));
    });
    }
}
