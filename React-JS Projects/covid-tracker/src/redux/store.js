import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import countryReducer from './countrySlice';
import allDetailsReducer from './DetailsSlice';

export default configureStore({
	reducer: {
        todos: todoReducer,
		countries: countryReducer,
		allDetails: allDetailsReducer
	},
});