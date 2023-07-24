import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoReducer';
const store = configureStore({
    reducer: videoReducer
  });

  export default store;