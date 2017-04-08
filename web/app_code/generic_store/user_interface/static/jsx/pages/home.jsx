"use strict";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { retrieveAppConstants } from "../actions/app-constant-action";
import ImageSlider from "../components/common/image-slider";
import WelcomeText from "../components/home/welcome-text";

@connect(
	(store) => {
		let state = {
			AppConstantState: store.AppConstantState
		}
		return state;
	}, 
	(dispatch) => {
		let actions = {
			retrieveAppConstants
		};
		return {actions: bindActionCreators(actions, dispatch)};
	}
)
export default class Home extends React.Component {

	componentWillMount() {
		//retrieve slider image constants
		let constGrpCodes = [
			"home_slider_images",
			"home_welcome_header",
			"home_welcome_text",
		];
		this.props.actions.retrieveAppConstants(constGrpCodes);
	}

	render() {	
		//redux store states
		let home_slider_images = this.props.AppConstantState.home_slider_images;
		let home_welcome_header = this.props.AppConstantState.home_welcome_header;
		let home_welcome_text = this.props.AppConstantState.home_welcome_text;
		//make sure states are available
		if(!home_slider_images) {
			return (<div></div>);
		}
		//creater slider list
		let sliderList = [];
		home_slider_images.forEach((element) => {
			let sliderItem = {
				slider_code: 'home_slider',
				imageurl: element.constant_value,
				caption: null
			};
			sliderList.push(sliderItem);
		});
		//create welcome text objects
		let welcomeHeader = home_welcome_header[0].constant_value;
		let welcomeBody = home_welcome_text[0].constant_value;
		return (
			<article>
				<div class="content-container-fluid ">
					<div class="row">
						<div class="col-lg-12">
							<section>
								<ImageSlider itemsList={sliderList} />
							</section>		
						</div>
						<div class="col-lg-3 col-sm-0"></div>
						<div class="col-lg-6 col-sm-12 page-content">
							<section>
								<WelcomeText header={welcomeHeader} body={welcomeBody} />
							</section>							
						</div>
						<div class="col-lg-3 col-sm-0"></div>				
					</div>				
				</div>
			</article>
		);
	}
}