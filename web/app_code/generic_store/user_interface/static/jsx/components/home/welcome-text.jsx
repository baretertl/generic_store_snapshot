"use strict";
import React from "react";

export default class WelcomeText extends React.Component {
	render() {	
		let { header, body } = this.props;
		return (
			<div class="padd">
				<div class="default-heading">
					<h3>
						{header}
					</h3>
					{body}
				</div>
			</div>
		);
	}
}

WelcomeText.propTypes = {
	header: React.PropTypes.string.isRequired,
	body: React.PropTypes.string.isRequired
}