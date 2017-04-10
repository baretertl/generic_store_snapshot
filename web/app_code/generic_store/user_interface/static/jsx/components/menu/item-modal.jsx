"use strict";
import React from "react";
import { Modal } from "react-bootstrap";
import { formatCurrency } from "../../utility/utils";
import ImageSlider from "../common/image-slider";
import DropdownSelect from "../common/dropdown-select";

export default class ItemModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			variation: null,
			item_choice: null
		}
		//bind functions
		this.onEntered = this.onEntered.bind(this);
		this.variationChange = this.variationChange.bind(this);
		this.itemChoiceChange = this.itemChoiceChange.bind(this);
	}

	onEntered() {
		let { item } = this.props;
		//set up available item choices
		let itemChoiceObj = null;
		for (let key in item.item_choice) {
			if(itemChoiceObj === null){
				itemChoiceObj = {};
			}
			itemChoiceObj[key] = null;
		}
		this.setState({item_choice: itemChoiceObj});
	}

	variationChange(value, object) {
		let { item } = this.props;
		//get variation
		let variation = item.variation;
		if(variation.length > 0) {
			//find the variation object with same id
			let selectedVariation = variation.find((element) => {
				return element.id === object.variation_id;
			});
			this.setState({variation: Object.assign({}, selectedVariation)});
		}		
	}

	itemChoiceChange(value, object){
		let { item } = this.props;
		//get item choice
		let item_choice = item.item_choice;
		let choiceKey = object.choice;
		//find the choice
		let choiceObj = item_choice[choiceKey];
		let selectedChoice = choiceObj.find((element) => {
			if (object.variation_id) {
				return object.item_id === element.item_id && object.variation_id === element.variation_id;
			}
			else {
				return object.item_id === element.item_id;
			}
		});
		//cant change state directly, so need a clone
		let currentChoice = Object.assign({}, this.state.item_choice);
		currentChoice[choiceKey] = Object.assign({}, selectedChoice);
		this.setState({item_choice: currentChoice});
	}
	
	render() {	
		let { show, item } = this.props;
		//bind functions
		//create slider list 
		let sliderList = [];
		if (item.variation.length > 0) {
			item.variation.forEach((element) => {
				let sliderItem = {
					slider_code: 'item_slider',
					imageurl: element.image_url === "None" ? "static/images/dish/dish" + Math.floor(Math.random() * 10 + 10) + ".jpg"  : this.item.image_url,
					caption: {
						title: element.name,
						body: null
					}
				}
				sliderList.push(sliderItem);
			});
		}
		else {
			let sliderItem = {
				slider_code: 'item_slider',
				imageurl: item.image_url === "None" ? "static/images/dish/dish" + Math.floor(Math.random() * 10 + 10) + ".jpg"  : this.item.image_url,
				caption: {
					title: item.name,
					body: null
				}
			};
			sliderList.push(sliderItem);
		}
		//create price options
		let priceOpts = []
		if(item.variation.length > 0) {
			priceOpts = item.variation.map((element, index) => {
				return {
					value: element.id,
					text: `${element.name}: ${formatCurrency(element.price)}`,
					object: { variation_id: element.id }
				}
			});
		}
		else {
			priceOpts.push({
				value: item.id,
				text: `${item.name}: ${formatCurrency(item.price)}`,
				object: null
			});
		}
		//div for item choices
		let itemChoiceDivs = []
		for (let key in item.item_choice) {
			let choiceOpts = item.item_choice[key].map((element, index) => {
				if(element.variation_id) {
					return {
						value: `${element.item_id}_${element.variation_id}`,
						text: `${element.variation_name} ${element.item_name}`,
						object: { choice: key, item_id: element.item_id, variation_id: element.variation_id }
					}
				}
				return {
					value: element.item_id,
					text: element.item_name,
					object: { choice: key, item_id: element.item_id }
				}
			});
			itemChoiceDivs.push(
				<div key={key} class="col-md-6 col-sm-12">
					<h4>
        		Select your side: 
        	</h4>
        	<DropdownSelect id={`item-side-select-${item.id}-${key}`} options={choiceOpts} defaultTitle={"Make a Selection"} onChange={this.itemChoiceChange} />
				</div>
			);
		}
		return (
			<Modal show={show} onHide={this.props.onHide} onEntered={this.onEntered} bsSize="large">
				<Modal.Header closeButton>
          <Modal.Title bsClass="text-center">
          	{item.name}
        	</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<div class="content-container-fluid">
        		<div class="row">
        			<div class="col-md-6 col-sm-12">
        				<ImageSlider itemsList={sliderList} />
        			</div>
        			<div class="col-md-6 col-sm-12">
        				<div class="content-container-fluid dish-detail">
        					<div class="row">
        						<div class="col-sm-12">
        							<p class="text-center">
        								{item.description}
        							</p>
        						</div>
        					</div>
        					<div class="row">
        						<div class="col-sm-12">
        							<h4>
        								Select your item: 
        							</h4>
        							<DropdownSelect id={`item-price-select-${item.id}`} options={priceOpts} defaultTitle={"Make a Selection"} onChange={this.variationChange} />
        						</div>
        					</div>
        					<div class="row">
      							{itemChoiceDivs}
        					</div>
        				</div>
        			</div>
        		</div>
        	</div>
        </Modal.Body>
			</Modal>
		);		
	}
}

ItemModal.propTypes = {
	show: React.PropTypes.bool.isRequired,
	onHide: React.PropTypes.func.isRequired,
	item: React.PropTypes.object.isRequired
}