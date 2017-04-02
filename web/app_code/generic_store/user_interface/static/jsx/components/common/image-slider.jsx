"use strict";
import React from "react";
import { Carousel } from "react-bootstrap";


export default class ImageSlider extends React.Component {

	render() {	
		//props
		let itemsList = this.props.ItemsList;
		let interval = this.props.interval;
		//default interval
		if(!interval) {
			interval = 5000;
		}
		let carouselList = itemsList.map((element, index) => {
			if(element.caption) {
				return (
					<Carousel.Item key={index}>
						<img class="img-responsive slider-image" src={element.imageurl} />
						<Carousel.Caption >
							<div class="slider-caption">
								<h3>
									{element.caption.title}
								</h3>
								<p>
									{element.caption.body}
								</p>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				)
			}
			return (
				<Carousel.Item key={index}>
					<img class="img-responsive slider-image" src={element.imageurl} />
				</Carousel.Item>
			)
		});

		return (
			<Carousel interval={interval}>
				{carouselList}
			</Carousel>	
		);
	}
}