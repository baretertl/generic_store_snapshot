"use strict";
import Axios from "axios";

export function retrieveStoreInfoAll() {
	//setup for api call to retrieve store info
	let locationPromise = Axios.get("/api/store_info/location/");
	let contactInfoPromise = Axios.get("/api/store_info/contact_info/");
	let storeHourPromise = Axios.get("/api/store_info/store_hour/");
	let storeNamePromise = Axios.get("/api/store_info/store_name/");
	let allPromise = Axios.all([locationPromise, contactInfoPromise, storeHourPromise, storeNamePromise]);
	//return action for dispatchj
	let action = (dispatch) => {
		dispatch({
			type: "STORE_INFO_FETCH",
			payload: allPromise
		});
	}
	return action;
}