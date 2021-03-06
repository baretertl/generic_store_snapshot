"use strict";
import React from "react";
import { formatCurrency } from "../../utility/utils";
import ItemModal from "./item-modal";

export default class Item extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
		//bind functions
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal() {
		this.setState({show: true});
	}

	hideModal() {
		this.setState({show: false});
	}

	render() {	
		let { item } = this.props;
		//for now use a dummy image url
		let imageUrl = item.image_url === "None" ? "static/images/dish/dish" + Math.floor(Math.random() * 10 + 10) + ".jpg"  : this.item.image_url;
		//price div
		let priceDiv = null;
		if (item.variation.length > 0) {
			let variation = item.variation;
			//price div with variations
			priceDiv = variation.map((element, index) => {
				return (
					<li key={index} class="list-group-item text-left item-price">
						{element.name}
						<span class="badge">
			    		{formatCurrency(element.price)}
	    			</span>
					</li>
				);
			});
		}
		else {
			priceDiv = (
			  <li class="list-group-item text-left item-price">				    
			    <span class="badge">
			    	{formatCurrency(item.price)}
	    		</span>
			  </li>
			);
		}

		return (
			<div class="dishes-item-container">
				<div class="img-frame" >
					<img src={imageUrl} class="img-responsive" alt="" />
					<div class="img-frame-hover">
						<a onClick={this.showModal}>
							<i class="fa fa-cutlery"></i>
						</a>
					</div>
				</div>					
				<div class="dish-details">
					<div >						
						<h3>
							{item.name}
						</h3>						
						<p>
							{item.description}
						</p>
					</div>
					<div>
						<h4>
							<ul class="list-group">
								{priceDiv}
							</ul>
						</h4>
					</div>
				</div>
				<ItemModal show={this.state.show} onHide={this.hideModal} item={item} />
			</div>
		);
	}
}

Item.propTypes = {
	item: React.PropTypes.object.isRequired
}