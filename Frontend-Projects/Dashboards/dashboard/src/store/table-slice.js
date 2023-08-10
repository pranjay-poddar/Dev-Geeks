import {createSlice} from '@reduxjs/toolkit';


const tableslice=createSlice({
    name:'table',
    initialState:{tablevisible:true},
    reducers:{
     toggle(state){
         state.tablevisible=!state.tablevisible;
     }
    }
});

export const tableaction=tableslice.actions;

export default tableslice;