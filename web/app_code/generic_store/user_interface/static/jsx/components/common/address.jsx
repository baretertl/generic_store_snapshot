"use strict";
import React from "react";

export default class Address extends React.Component {

	render() {
		let { address } = this.props;

		return(
			<div>
				<div>{address.address_line_1}</div>
				<div>{address.address_line_2}</div>
				<div>{`${address.city}, ${address.state_code} ${address.postal_code}`}</div>
			</div>
		);
	}
}

Address.propTypes = {
	address: React.PropTypes.object.isRequired
}