"use strict";
import React from "react";

export default class Footer extends React.Component {
	render() {	
		//props
		let storeName = this.props.storeName;
		return (
			<div class="footer">
				<div class="footer-copyright">
					<p>
						Copyright &copy; {storeName} All Rights Reserved
					</p>
				</div>
			</div>			
		);
	}
}

Footer.propTypes = {
	storeName: React.PropTypes.string.isRequired
}