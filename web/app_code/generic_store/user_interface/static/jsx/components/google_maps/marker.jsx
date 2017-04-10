"use strict";
import React from "react";
import ReactDOM from 'react-dom';
import { camelize } from "../../utility/utils";

export default class Marker extends React.Component {

	constructor(props) {
		super(props);
		//declare other members
		this.marker = null;
		this.eventNames = ["click", "mouseover"];
	}

	componentDidUpdate(prevProps) {
		let { map, coordinates } = this.props;
		if(prevProps.map !== map || prevProps.coordinates !== coordinates) {
			this.renderMarker();
		}
	}

	componentWillUnmount() {
		if(this.marker) {
			this.marker.setMap(null);
		}
	}

	renderMarker() {
		let { map, coordinates, google } = this.props;
		//create the marker
		let markerPos = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
		let prefs = {
			map: map,
			position: markerPos
		};
		this.marker = new google.maps.Marker(prefs);
		//bind events
		this.eventNames.forEach((element) => {
			this.marker.addListener(element, this.handleEvent(element));
		});
	}

	handleEvent(eventName) {
	  return (e) => {
      let handlerName = `on${camelize(eventName)}`;
      if (this.props[handlerName]) {
        this.props[handlerName](this.props, this.marker, e);
      }
    }
  }

	render() {
		return null;
	}
}

Marker.propTypes = {
	coordinates: React.PropTypes.object.isRequired,
	map: React.PropTypes.object,
	google: React.PropTypes.object,
	onClick: React.PropTypes.func,
	onMouseover: React.PropTypes.func
}

Marker.defaultProps = {
	onClick: () => {},
	onMouseover: () => {} 
}