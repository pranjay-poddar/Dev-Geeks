// videoActions.js
export const setVideoUrl = (url) => {
  return {
    type: 'SET_VIDEO_URL',
    payload: url
  };
};

export const setVideoCollection = (url) => {
  return {
    type: 'SET_VIDEO_COLLECTION',
    payload: url
  };
};
export const setVideoIndex = (number) => {
  return {
    type: 'SET_VIDEO_NUMBER',
    payload: (number<0)?0:number,
  };
};