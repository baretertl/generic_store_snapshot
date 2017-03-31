"use strict";
import React from "react";
import { Modal } from "react-bootstrap";
import ImageSlider from "../common/image-slider";
import ItemChoice from "./item-choice";
import ItemPrice from "./item-price";

export default class ItemModal extends React.Component {

	formatCurrency(number) {
		return "$" + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}

	render() {	
		//props
		let show = this.props.show;
		let onHide = this.props.onHide;
		let item = this.props.item;
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
		//choice lists
		let itemChoicesList = [];
		for (let key in item.item_choice){
			itemChoicesList.push(
				<ItemChoice key={`itmChcGrp${key}`} groupKey={key} choice={item.item_choice[key]} />
			)
		};
		return (
			<Modal show={show} onHide={onHide} bsSize="large">
				<Modal.Header closeButton>
          <Modal.Title bsClass="text-center">
          	{item.variation.length === 0 ? `${item.name} ${this.formatCurrency(item.price)}` : item.name}
        	</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<div class="content-container-fluid">
        		<div class="row">
        			<div class="col-md-6 col-sm-12">
        				<ImageSlider ItemsList={sliderList} Interval={7000} />
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
        						<ItemPrice item={item} />        					
        					</div>
        					<div class="row">
        						{itemChoicesList}
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