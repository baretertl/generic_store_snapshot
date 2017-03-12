"use strict";
import Axios from "axios";
import History from "history";
import React from "react";
import ReactBootstrap from "react-bootstrap";
import ReactDOM from "react-dom";
import ReactRedux from "react-redux";
import ReactRouter from "react-router";
import Redux from "redux";
import ReduxLogger from "redux-logger";
import ReduxThunk from "redux-thunk";

import Layout from "./components/Layout";

var baseurl = "/api";
Axios.get(baseurl + '/app_locale/locale_name/').then((result) => {
	console.log(result);
});
const app = document.getElementById("app");
ReactDOM.render(<Layout/>, app); 