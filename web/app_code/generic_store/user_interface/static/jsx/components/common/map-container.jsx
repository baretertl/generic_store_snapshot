"use strict";
import React from "react";
import GoogleMaps from "../google_maps/google-maps";
import Map from "../google_maps/map";

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		//set initial state
		this.state = {
			mapReady: false,
			showInfoWindow: false,
			activeMarker: null,
			markerProps: null
		}
		//bind functions
		this.mapReady = this.mapReady.bind(this);
		this.mapClicked = this.mapClicked.bind(this);
		this.showMarkerInfo = this.showMarkerInfo.bind(this);
		this.infoWindowClosed = this.infoWindowClosed.bind(this);
	}

	mapReady() {
		//setting the mapReady state is needed to force a rerender after the map is created
		let { mapReady } = this.state;
		if(!mapReady){
			this.setState({ mapReady: true });
		}
	}

	mapClicked() {
		this.setState({
			showInfoWindow: false,
			activeMarker: null,
			markerProps: null
		});
	}

	showMarkerInfo(props, marker, event) {
		this.setState({
			showInfoWindow: true,
			activeMarker: marker,
			markerProps: props
		});
	}

	infoWindowClosed() {
		this.setState({
			showInfoWindow: false,
			activeMarker: null,
			markerProps: null
		});
	}

	render() {
		let { google, zoom, initialCenter, useCurrentLocation, markers, loaded } = this.props;
		let { showInfoWindow, activeMarker, markerProps } = this.state;
		if(!loaded) {
			return (<div>Loading...</div>);
		}
  	//build markers
		let markerDiv = markers.map((element, index) => {
			//get values
			let { coordinates, infoDiv } = element;
			return(
				<Map.Marker key={index} coordinates={coordinates} onClick={this.showMarkerInfo} onMouseover={this.showMarkerInfo}>
					{infoDiv}
				</Map.Marker>
			);
		});
		//build info window
		let infoWindowDiv = null;
		if(markerProps) {
			infoWindowDiv = (
				<Map.InfoWindow marker={activeMarker} visible={showInfoWindow} onClose={this.infoWindowClosed} >
					{markerProps.children}
				</Map.InfoWindow>
			);
		}
		else {
			infoWindowDiv = (
				<Map.InfoWindow marker={activeMarker} visible={showInfoWindow} onClose={this.infoWindowClosed}>				
				</Map.InfoWindow>
			);
		}
		return (
			<Map google={google} zoom={zoom} initialCenter={initialCenter} useCurrentLocation={useCurrentLocation} onClick={this.mapClicked} onReady={this.mapReady} >
				{markerDiv}
				{infoWindowDiv}
			</Map>
		);
	}
}

MapContainer.propTypes = {
	zoom: React.PropTypes.number,
	initialCenter: React.PropTypes.object,
	useCurrentLocation: React.PropTypes.bool, 
	markers: React.PropTypes.array
}

MapContainer.defaultProps = {
	zoom: 15,
	initialCenter: {
		latitude: 0,
		longitude: 0
	},
	useCurrentLocation: false,
	markers: []
}

export default GoogleMaps(MapContainer);