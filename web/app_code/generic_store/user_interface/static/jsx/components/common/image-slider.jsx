"use strict";
import React from "react";
import { Carousel } from "react-bootstrap";


export default class ImageSlider extends React.Component {

	render() {	
		let itemsList = this.props.ItemsList;
		let interval = this.props.interval;
		if(!interval) {
			interval = 5000;
		}

		let imgStyle = {
			maxHeight: "300px",
			margin: "0 auto"
		};

		let carouselList = itemsList.map((element, index) => {
			if(element.caption) {
				return (
					<Carousel.Item key={`sldrItm${element.slider_code}${index}`}>
						<img key={`sldrImg${element.slider_code}${index}`} class="img-responsive" style={imgStyle} src={element.imageurl} />
						<Carousel.Caption key={`sldrCptn${element.slider_code}${index}`}>
							<h3 key={`sldrCptnTtl${element.slider_code}${index}`}>
								{element.caption.title}
							</h3>
							<p key={`sldrCptnBdy${element.slider_code}${index}`}>
								{element.caption.body}
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				)
			}
			return (
				<Carousel.Item key={`sldrItm${element.slider_code}${index}`}>
					<img key={`sldrImg${element.slider_code}${index}`} class="img-responsive" style={imgStyle} src={element.imageurl} />
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