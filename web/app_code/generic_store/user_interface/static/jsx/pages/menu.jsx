"use strict";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { retrieveMenu } from "../actions/menu-action";
import Category from "../components/menu/category";

@connect(
	(store) => {
		let state = {
			MenuState: store.MenuState
		}
		return state;
	}, 
	(dispatch) => {
		let actions = {
			retrieveMenu
		};
		return {actions: bindActionCreators(actions, dispatch)};
	}
)
export default class Menu extends React.Component {

	componentWillMount() {
		//retrieve slider image constants
		this.props.actions.retrieveMenu();
	}

	render() {	
		//redux store states
		let menu = this.props.MenuState.menu;
		//make sure states are available		
		if(!menu){
			return (<div></div>);
		}

		let categories = menu.category;
		let categoryDiv = categories.map((element, index) => {
			return (
				<div key={`ctgryRow${index}`} class="row">
					<Category key={`ctgryObj${index}`} category={element} />
				</div>
			);
		});

		return (
			<article>
				<div class="content-container-fluid">
					<div class="padd dishes">
						<div class="container">								
							{categoryDiv}
						</div>
					</div>							
				</div>
			</article>
		);
	}
}