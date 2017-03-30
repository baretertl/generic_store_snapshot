"use strict";
//initial state
let default_state = {};

//helper functions to manipulate the state
function setNewConstants(currentState, payload) {
	let fetchedData = {}
	payload.data.forEach((element) => {
		fetchedData[element.constant_group_code] = element.constant;		
	});
	return Object.assign({}, currentState, fetchedData);
}

//export as the reducer
export default function reducer(state=default_state, action) {
	switch(action.type) {
		case "APP_CONSTANT_FETCH_FULFILLED":
			return setNewConstants(state, action.payload);
			break;
		default: 
			return state;
	}
}