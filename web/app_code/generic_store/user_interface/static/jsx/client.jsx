"use strict";
import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Layout from "./components/Layout";

var baseurl = "/api";

Axios.get(baseurl + '/app_locale/locale_name/').then((result) => {
	console.log(result);
});

const app = document.getElementById("app");
ReactDOM.render(<Layout/>, app); 