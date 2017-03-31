"use strict";
import React from "react";

export default class ItemChoice extends React.Component {

	formatCurrency(number) {
		return "$" + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	render() {	
		//props
		let item = this.props.item;
		if(item.variation.length === 0) {
			return (<div></div>);
		}
		//item price div
		return (
			<div class="col-sm-12">
				<h4 class="text-left">
					Select One:
				</h4>
				<div class="row">
				</div>
			</div>
		);
	}
}