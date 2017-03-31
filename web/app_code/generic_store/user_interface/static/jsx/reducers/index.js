"use strict";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AppConstantReducer from "./app-constant-reducer";
import StoreInfoReducer from "./store-info-reducer";
import MenuReducer from "./menu-reducer";

const reducer = combineReducers({
	routing: routerReducer,
	AppConstantState: AppConstantReducer,
	StoreInfoState: StoreInfoReducer,
	MenuState: MenuReducer
});
export default reducer;