"use strict";
import React from "react";

export default class WelcomeText extends React.Component {
	render() {	
		let WelcomeTextData = this.props.WelcomeTextData;
		return (
			<div class="padd">
				<div class="default-heading">
					<h3>
						{WelcomeTextData.header}
					</h3>
					{WelcomeTextData.text}
				</div>
			</div>
		);
	}
}