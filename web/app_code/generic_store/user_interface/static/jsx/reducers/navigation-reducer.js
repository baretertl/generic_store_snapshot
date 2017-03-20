"use strict";

//initial state
let default_state = {
	collapsed: false,
};

//helper functions to manipulate the state
function setCollapse(currentState, payload) {
	let newCollapseState = {
		collapsed: payload.collapsed
	};
	return Object.assign({}, currentState, newCollapseState);
}

//export as the reducer
export default function reducer(state=default_state, action) {
	switch(action.type) {
		case "NAVIGATION_SET_COLLAPSE":
			return setCollapse(state, action.payload);
			break;
		default: 
			return state;
	}
}