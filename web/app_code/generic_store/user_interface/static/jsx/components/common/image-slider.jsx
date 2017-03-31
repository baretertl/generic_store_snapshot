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
					<Carousel.Item key={`sldrItm${element.slider_code}${index}`}>
						<img key={`sldrImg${element.slider_code}${index}`} class="img-responsive slider-image" src={element.imageurl} />
						<Carousel.Caption key={`sldrCptn${element.slider_code}${index}`}>
							<div class="slider-caption">
								<h3 key={`sldrCptnTtl${element.slider_code}${index}`}>
									{element.caption.title}
								</h3>
								<p key={`sldrCptnBdy${element.slider_code}${index}`}>
									{element.caption.body}
								</p>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				)
			}
			return (
				<Carousel.Item key={`sldrItm${element.slider_code}${index}`}>
					<img key={`sldrImg${element.slider_code}${index}`} class="img-responsive slider-image" src={element.imageurl} />
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