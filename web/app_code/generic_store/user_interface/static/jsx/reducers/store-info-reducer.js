"use strict";

//initial state
let default_state = {
	location: null,
	store_hour: null,
	contact_info: null,
	store_name: null
};

//helper functions to manipulate the state
function setStoreInfo(currentState, payload) {
	let fetchedData = {}
	payload.forEach((element) => {
		if (element.config.url.match(/location/)){
			fetchedData.location = element.data[0];
		}
		else if(element.config.url.match(/store_hour/)){
			fetchedData.store_hour = element.data;
		}
		else if(element.config.url.match(/store_name/)){
			fetchedData.store_name = element.data[0];
		}
		else if(element.config.url.match(/contact_info/)){
			fetchedData.contact_info = element.data[0];
		}
	});
	return Object.assign({}, currentState, fetchedData);
}

//export as the reducer
export default function reducer(state=default_state, action) {
	switch(action.type) {
		case "STORE_INFO_FETCH_FULFILLED":
			return setStoreInfo(state, action.payload);
		default:
			return state;
	}
}