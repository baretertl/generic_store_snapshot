"use strict";
import Axios from "axios";

export function retrieveMenu() {
	//setup for api call to retrieve menu
	let menuPromise = Axios.get("/api/menu/category/");
	//return action for dispatchj
	let action = (dispatch) => {
		dispatch({
			type: "MENU_FETCH",
			payload: menuPromise
		});
	}
	return action;
}