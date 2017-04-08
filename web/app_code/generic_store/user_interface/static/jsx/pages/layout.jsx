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
  	let routing = this.props.routing;
  	let StoreInfoState = this.props.StoreInfoState;
  	let AppConstantState = this.props.AppConstantState;
  	//actions
  	let actions = this.props.actions;
  	if(!StoreInfoState.store_name || !AppConstantState.navigation) {
  		return (<div></div>);
  	}
  	return (
	    <div class="wrapper">
	    	<div class="header">
					<div class="container">
						<header>
	    				<Header storeHour={StoreInfoState.store_hour} contactInfo={StoreInfoState.contact_info} />
	    			</header>
	    			<nav>
	    				<Navigation routing={routing} navigation={AppConstantState.navigation} storeName={StoreInfoState.store_name.name} />
	    			</nav>
	    		</div>
	    	</div>
	    	<main>
    			{this.props.children}
	    	</main>
	    	<footer>
	    		<Footer storeName={StoreInfoState.store_name.name} />
	    	</footer>
	    </div>
    );  	
  }
}