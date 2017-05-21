"use strict";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MapContainer from "../components/common/map-container";
import Address from "../components/common/address";
import ContactFrom from "../components/location/contact-form";

@connect(
	(store) => {
		let state = {
			StoreInfoState: store.StoreInfoState
		}
		return state;
	}
)
export default class Location extends React.Component {

	render() {
		let { StoreInfoState } = this.props;
		//get location
		let { location } = StoreInfoState;
		let addressRef=`${location.address_line_1},${location.city},${location.state_code},${location.postal_code}`;
		let markers = [{
			coordinates: {
				latitude: location.latitude,
				longitude: location.longitude
			},
			infoDiv: ( //info window for google maps
				<div>
					<h5>
						<Address address={location} />
					</h5>
					<div class="text-right">
						<a class="btn btn-danger" href={`http://maps.google.com/?q=${addressRef}`} target="_blank">
							View Larger Map
						</a>
					</div>
				</div>
			)
		}];
		let initialCenter = {
			latitude: location.latitude,
			longitude: location.longitude
		}
		
		return (
			<article>	
				<div class="content-container-fluid">
					<div class="row">
						<div class="col-md-1 col-sm-0"></div>
						<div class="col-md-5 col-sm-12 text-left">
							<h3>Our Location</h3>
							<div class="location-google-map">
								<MapContainer apiKey={"AIzaSyAv2CJwBr7SPdRYNTrEstH4I8KxC1RCK7Y"} initialCenter={initialCenter} markers={markers}  />
							</div>
							<div class="text-left">
								<h3>Our Address</h3>
	 							<Address address={location} />					
							</div>
						</div>
						<div class="col-md-5 col-sm-12 text-left">
							<h3>Leave Us a Message</h3>
							<ContactFrom contactAction={(args)=>{console.log(args)}} />
						</div>
						<div class="col-md-2 col-sm-0"></div>
					</div>
				</div>
			</article>
		);
	}
}