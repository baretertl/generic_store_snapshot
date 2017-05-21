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
		let { MenuState } = this.props;
		if(!MenuState.menu) {
			//retrieve slider image constants
			this.props.actions.retrieveMenu();
		}
	}

	render() {
		let { MenuState } = this.props;
		//get menu
		let menu = MenuState.menu;
		//make sure states are available		
		if(!menu){
			return (<div>Loading...</div>);
		}

		let categories = menu.category;
		let categoryDiv = categories.map((element, index) => {
			return (
				<div key={index} class="row">
					<Category category={element} />
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