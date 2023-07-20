// videoReducer.js
const initialState = {
  videoUrl: null,
  videoCollectionUrl: [],
  videoNumber:0,

};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEO_URL':
      return {
        ...state,
        videoUrl: action.payload
      };
    case 'SET_VIDEO_COLLECTION':
      return {
        ...state,
        videoCollectionUrl: action.payload
      };
    case 'SET_VIDEO_NUMBER':
        return{
          ...state,
          videoNumber:action.payload
        };
        
    default:
      return state;
  }
};

export default videoReducer;
