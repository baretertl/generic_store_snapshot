"use strict";
import React from "react";
import Item from "./item";

export default class Category extends React.Component {
	render() {	
		//props
		let category = this.props.category;
		let items = category.item;
		//item div
		let itemDivs = items.map((element, index) => {
			return (
				<div key={`itemDiv${index}`} class="col-lg-3 col-md-6 col-sm-12 menu-item-height">
					<Item key={`itemObj${index}`} item={element} />
					<br />
				</div>
			)
		});

		return (
			<div class="col-lg-12">
				<div class="default-heading">
					<h2>
						{category.name}
					</h2>
					<p>
						{category.description}
					</p>
				</div>
					{itemDivs}
				<div class="border"></div>
			</div>
		);
	}
}