"use strict";
import Axios from "axios";

export function retrieveAppConstants(constGrpLst) {
	//setup for api call to retrieve constants
	let formatedGrlLst = constGrpLst.map((element) => {
		return {constant_group_code: element};
	});
	let postData = {group_codes: formatedGrlLst};
	let postPromise = Axios.post("/api/app_constant/constant_group", postData);
	//return action for dispatchj
	let action = (dispatch) => {
		dispatch({
			type: "APP_CONSTANT_FETCH",
			payload: postPromise
		});
	}
	return action;
}