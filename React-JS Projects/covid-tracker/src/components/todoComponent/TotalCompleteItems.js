import React from 'react';

const TotalCompleteItems = (state) => {
	console.log("items lenght", state)
	return <h4 className='mt-3'>Total Complete Items: {state.length}</h4>;
};

export default TotalCompleteItems;
