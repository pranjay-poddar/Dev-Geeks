import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  response: "",
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};
const backend = "https://url-shortener-wkbn.onrender.com/";

export const urlThunk = createAsyncThunk(
  "urls/urlfetchdata",
  async (longURL) => {
    console.log(longURL, "long url ");
    return await axios
      .post(`${backend}url`, { longURL })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }
);

export const urlSlice = createSlice({
  name: "url",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(urlThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(urlThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(urlThunk.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = true;
        console.log(action.payload);
      });
  },
});
export default urlSlice.reducer;
