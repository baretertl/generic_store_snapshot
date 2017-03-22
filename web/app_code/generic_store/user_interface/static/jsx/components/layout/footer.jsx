"use strict";
import React from "react";

export default class Footer extends React.Component {
	render() {	
		let store_name = this.props.StoreInfoState.store_name;

		return (
			<div class="footer">
				<div class="footer-copyright">
					<p>
						Copyright &copy; {store_name.name} All Rights Reserved
					</p>
				</div>
			</div>			
		);
	}
}