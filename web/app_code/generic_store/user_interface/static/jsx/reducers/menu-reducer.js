"use strict";
//initial state
let default_state = {
	menu: null
};

//helper functions to manipulate the state
function setMenu(currentState, payload) {
	let fetchedData = { 
		menu: {
			category: payload.data
		}
	}
	return Object.assign({}, currentState, fetchedData);
}

//export as the reducer
export default function reducer(state=default_state, action) {
	switch(action.type) {
		case "MENU_FETCH_FULFILLED":
			return setMenu(state, action.payload);
		default:
			return state;
	}
}