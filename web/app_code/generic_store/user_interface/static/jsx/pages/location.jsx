"use strict";
import React from "react";
import MapContainer from "../components/common/map-container";

export default class Location extends React.Component {

	render() {

		let markers = [{
			coordinates: {
				latitude: 38.8976763,
				longitude: -77.0365298
			},
			infoDiv: (
				<div>	
					text here..............
				</div>
			)
		}];

		let initialCenter = {
			latitude: 38.8976763,
			longitude: -77.0365298
		}

		return (
			<div style={{width: "500px", height: "300px"}}>
				<MapContainer apiKey={"AIzaSyAv2CJwBr7SPdRYNTrEstH4I8KxC1RCK7Y"} initialCenter={initialCenter} markers={markers}  />
			</div>
		);
	}
}