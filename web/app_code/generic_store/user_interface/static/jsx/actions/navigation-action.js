"use strict";
import Axios from "axios";

export function toggleCollapse(collapsed) {
	//return action for dispatchj
	let action = (dispatch) => {
		dispatch({
			type: "NAVIGATION_SET_COLLAPSE",
			payload: {
				collapsed: !collapsed
			}
		});
	}
	return action;
}