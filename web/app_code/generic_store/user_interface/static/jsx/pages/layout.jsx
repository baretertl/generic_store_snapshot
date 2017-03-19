"use strict";
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollapse } from "../actions/navigation-action";
import Header from "../components/layout/header";
import Navigation from "../components/layout/navigation"
import Footer from "../components/layout/footer";

@connect(
	(store) => {
		let states = {
			routing: store.routing,
			NavigationState: store.NavigationState,
			StoreInfoState: store.StoreInfoState
		};
		return states;
	},
	(dispatch) => {
		let actions = { toggleCollapse };
		return {actions: bindActionCreators(actions, dispatch)};
	}
)
export default class Layout extends React.Component {

  render() {
  	let { routing, NavigationState, StoreInfoState, actions } = this.props;
  	return (
	    <div class="wrapper">
	    	<div class="header">
					<div class="container">
	    			<Header StoreInfoState={StoreInfoState} />
	    			<Navigation routing={routing} NavigationState={NavigationState} actions={actions} />
	    		</div>
	    	</div>	    	
	    	{this.props.children}
	    	<Footer />
	    </div>
    );  	
  }
}
