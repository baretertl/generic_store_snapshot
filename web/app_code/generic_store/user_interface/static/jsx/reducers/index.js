"use strict";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AppConstantReducer from "./app-constant-reducer";
import NavigationReducer from "./navigation-reducer";
import StoreInfoReducer from "./store-info-reducer";

const reducer = combineReducers({
	routing: routerReducer,
	AppConstantState: AppConstantReducer,
	NavigationState: NavigationReducer,
	StoreInfoState: StoreInfoReducer
});
export default reducer;