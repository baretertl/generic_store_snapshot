"use strict";
import React from "react";
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'

export default class InfoWindow extends React.Component {

	constructor(props) {
		super(props);
		//bind function calls
		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	componentDidUpdate(prevProps) {
		let { map, children, visible } = this.props;
		if(prevProps.map !== map) {
			//map changed
			this.renderInfoWindow();
		}
		if(prevProps.children !== children) {
			//children changed
			this.updateContent();
		}
		if(prevProps.visible !== visible) {
			//visibility changed
			this.props.visible ? this.openWindow() : this.closeWindow();
		} 
	}

	renderInfoWindow() {
		let { map, google } = this.props;
		//create the info window
		this.infoWindow = new google.maps.InfoWindow({content: ""});
		//bind 2 events
		google.maps.event.addListener(this.infoWindow, "closeclick", this.onClose);
		google.maps.event.addListener(this.infoWindow, "domready", this.onOpen);
	}

	updateContent() {
		let { children } = this.props;
		if(children){
			let content = ReactDOMServer.renderToString(children);
			this.infoWindow.setContent(content);
		}
	}

  openWindow() {
  	let { map, marker } = this.props;
    this.infoWindow.open(this.props.map, this.props.marker);
  }

  closeWindow() {
    this.infoWindow.close();
  }

  onOpen() {
  	this.props.onOpen();
  }

  onClose() {
  	this.props.onClose();
  }

	render() {
		return null;
	}
}

InfoWindow.propTypes = {
	visible: React.PropTypes.bool.isRequired,
	map: React.PropTypes.object,
	google: React.PropTypes.object,
	onOpen: React.PropTypes.func,
	onClose: React.PropTypes.func
}

InfoWindow.defaultProps = {
	onOpen: () => {},
	onClose: () => {}
}