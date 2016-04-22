
const initialState = {
	message: 'test'
};

const appReducer = ( state = initialState, action ) => {
	return {
		...state
	};
};

export default appReducer;
