"use strict";
import React from "react";
import { GoogleApiWrapper, Marker, Map } from "google-maps-react";

export class MapContainer extends React.Component {

	render() {
		if(!this.props.google) {
			return <div> </div>;
		}
		return (			
			<div> 
				<Map 
			    style={{width: '100%', height: '100%', position: 'relative'}}
			    className={'map'}
			    zoom={14}>
				  <Marker
				    name={'SOMA'}
				    position={{lat: 37.778519, lng: -122.405640}} />
				  <Marker
				    name={'Dolores park'}
				    position={{lat: 37.759703, lng: -122.428093}} />
				</Map>
			</div>
		)
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyAv2CJwBr7SPdRYNTrEstH4I8KxC1RCK7Y"
})(MapContainer);