"use strict";
import React from "react";

export default class ItemChoice extends React.Component {
	render() {	
		//props
		let key = this.props.groupKey;
		let choice = this.props.choice;
		//create item choice div
		let choiceList = choice.map((element, index) => {
			return (
				<li key={`itemChc${key}_${index}`} class="list-group-item text-left">
					{element.variation_name ? `${element.variation_name} ${element.item_name}` : element.item_name}
				</li>
			);
		});		
		return (
			<div class="col-lg-6 col-sm-12">
				<h4 class="text-left">
					Choose One:
				</h4>
				<ul class="list-group">
					{choiceList}
				</ul>
			</div>
		);
	}
}