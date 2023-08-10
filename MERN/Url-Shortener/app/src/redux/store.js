import { configureStore } from "@reduxjs/toolkit";

import urlReducer from "./urlSlice";

export const store = configureStore({
  reducer: {
    url: urlReducer,
  },
});
