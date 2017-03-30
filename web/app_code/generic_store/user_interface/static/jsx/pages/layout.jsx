"use strict";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/layout/header";
import Navigation from "../components/layout/navigation";
import Footer from "../components/layout/footer";

@connect(
	(store) => {
		let states = {
			routing: store.routing,
			AppConstantState: store.AppConstantState,
			StoreInfoState: store.StoreInfoState
		};
		return states;
	}
)
export default class Layout extends React.Component {

  render() {
  	//redux store states
  	let { routing, StoreInfoState, AppConstantState, actions } = this.props;  	
  	return (
	    <div class="wrapper">
	    	<div class="header">
					<div class="container">
						<header>
	    				<Header StoreInfoState={StoreInfoState} />
	    			</header>
	    			<nav>
	    				<Navigation routing={routing} AppConstantState={AppConstantState} StoreInfoState={StoreInfoState} actions={actions} />
	    			</nav>
	    		</div>
	    	</div>
	    	<main>
    			{this.props.children}
	    	</main>
	    	<footer>
	    		<Footer StoreInfoState={StoreInfoState} />
	    	</footer>
	    </div>
    );  	
  }
}