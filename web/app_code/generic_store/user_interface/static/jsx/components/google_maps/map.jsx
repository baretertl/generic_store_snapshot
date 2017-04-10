"use strict";
import React from "react";
import ReactDOM from 'react-dom';
import { camelize } from "../../utility/utils";
import Marker from "./marker";
import InfoWindow from "./info-window";

export default class Map extends React.Component {
	
	constructor(props) {
		super(props);
		//set intital map location
		let initialCenter = props.initialCenter;
		this.state = {
			currentCenter: {
				longitude: initialCenter.longitude,
				latitude: initialCenter.latitude
			}
		};
		//initialize other member variables
		this.map = null;
		this.eventNames = ["ready", "click", "dragend"];
	}

	componentDidMount() {
		let { useCurrentLocation } = this.props;
		//set current location as center
		if(useCurrentLocation) {
			if(navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					this.setState({
						currentCenter: {
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude
						}
					});
				});
			}
		}
		this.renderMap();
	}

	componentDidUpdate(prevProps, prevState) {
		let { google } = this.props;
		let { currentCenter } = this.state;
		//check for prop changes
		if(prevProps.google !== google) {
			this.renderMap();
		}
		//check for state changes
		if(prevState.currentCenter !== currentCenter){
			this.recenterMap();
		}
	}

	renderMap() {
		let { zoom, google } = this.props;
		let { currentCenter } = this.state;
		if(this.props && this.props.google) {
			//get the ref to map node
			let mapRef = this.refs.map;
			let node = ReactDOM.findDOMNode(mapRef);
			//get center of map
      let center  = new google.maps.LatLng(currentCenter.latitude, currentCenter.longitude);
      let mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new google.maps.Map(node, mapConfig);
      //bind events
      this.eventNames.forEach((element) => {
      	this.map.addListener(element, this.handleEvent(element));
      });
      //trigger ready event
      google.maps.event.trigger(this.map, 'ready');
		}
	}

	renderChildren() {
		let { children } = this.props;
		if(!children) {
			return null;
		}
		return React.Children.map(children, (element) => {
			return React.cloneElement(element, { map: this.map, google: this.props.google });
		});
	}

	recenterMap() {
		let { google } = this.props;
		let { currentCenter } = this.state;
		//recenter the map
		if(this.map) {
			let center = new google.maps.LatLng(currentCenter.latitude, currentCenter.longitude);
			this.map.panTo(center);
		}
	}

	//event handler
	handleEvent(eventName) {
		let handlerName = `on${camelize(eventName)}`;
		let timeout;
		//return a function that will eventually call the right prop function		
    return (e) => {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if(this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
	}

	render() {
		return (
			<div ref="map" class="google-map">
				{this.renderChildren()}
			</div>
		)
	}
}

Map.propTypes = {
	google: React.PropTypes.object.isRequired,
	zoom: React.PropTypes.number.isRequired,
	initialCenter: React.PropTypes.object,
	useCurrentLocation: React.PropTypes.bool,
	onReady: React.PropTypes.func,
	onClick: React.PropTypes.func,
	onDragend: React.PropTypes.func	
}

Map.defaultProps = {
	useCurrentLocation: false,
	initialCenter: {
		latitude: 0,
		longitude: 0
	},
	onReady: () => {},
	onClick: () => {},
	onDragend: () => {}
}

Map.Marker = Marker;
Map.InfoWindow = InfoWindow;