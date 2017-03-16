"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import PageRouter from "./router";

const app = document.getElementById("app");
const app_dom = (
	<Provider store={store}>
		<PageRouter />
	</Provider>
);
ReactDOM.render(app_dom, app);