
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCountriesAsync = createAsyncThunk(
    'countries/getCountries',
    async () =>{
        const response = await fetch('https://covid19.mathdro.id/api/countries');
        if(response.ok) {
            const countries = await response.json();
            return {countries}
        }
    }
);

const Countryslice = createSlice({
    name:"countries",
    initialState : {
        countries: [],
        loadingStatus: "",
        selectedCountry: ""
    },
    reducers:{
        selectCountry:(state, action) =>{
            state.selectedCountry= action.payload.selectedCountry
            // state[index].selectedCountry = n.payload.completed;
        }
    },
    extraReducers: {
        [getCountriesAsync.fulfilled]: (state, action)=>{
            state.countries = action.payload.countries.countries;
            state.loadingStatus = "success";
        },
        [getCountriesAsync.pending]: (state)=>{
            state.loadingStatus = "loading";
        },
        [getCountriesAsync.rejected]: (state)=>{
            state.loadingStatus = "failed";
        }
    }
});


export const {selectCountry} =  Countryslice.actions;

export default Countryslice.reducer;
