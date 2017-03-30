"use strict";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AppConstantReducer from "./app-constant-reducer";
import StoreInfoReducer from "./store-info-reducer";

const reducer = combineReducers({
	routing: routerReducer,
	AppConstantState: AppConstantReducer,
	StoreInfoState: StoreInfoReducer
});
export default reducer;