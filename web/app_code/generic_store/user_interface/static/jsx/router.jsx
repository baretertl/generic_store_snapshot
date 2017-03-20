"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store";
import { retrieveAppConstants } from "./actions/app-constant-action";
import { retrieveStoreInfoAll } from "./actions/store-info-action";
import Layout from "./pages/layout";

const history = syncHistoryWithStore(hashHistory, store);

@connect(
	(store) => {
		let states = {
			AppConstantState: store.AppConstantState
		};
		return states;
	}, 
	(dispatch) => {
		let actions = { 
			retrieveAppConstants,
			retrieveStoreInfoAll
		};
		return {actions: bindActionCreators(actions, dispatch)};
	}
)
export default class PageRouter extends React.Component {

	componentWillMount() {
		//initial list constant code retrieve
		let constGrpCodes = [
			"navigation"
		];
		this.props.actions.retrieveAppConstants(constGrpCodes);
		//initial store info retrieve
		this.props.actions.retrieveStoreInfoAll();
	}

	render() {
		let navigation = this.props.AppConstantState.navigation;

		if(!navigation) {
			//navigations not yet retrieved
			return (<div>Loading</div>)
		}

		//navigations retrieved, build routes
		let pageRoutes = navigation.map((element) => {
			let key = element.id;
			let name = element.constant_code; 
			let path = `${element.constant_code}`; 			
			let component = require(`./pages/${name}`).default;
			if(name === "home") {
				return (<IndexRoute key={key} component={component} />)
			}
			return (<Route key={key} path={path} name={name} component={component} />)			
		});
		return (
			<Router history={history}>
				<Route path="/" component={Layout}>
					{pageRoutes}
				</Route>
			</Router>
		);
	}
}