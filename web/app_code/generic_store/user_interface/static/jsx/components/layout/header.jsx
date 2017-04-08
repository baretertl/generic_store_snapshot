"use strict";
import React from "react";
import { formatTime } from "../../utility/utils";

export default class Header extends React.Component {

	render() {
		//props	
		let storeHour = this.props.storeHour;
		let contactInfo = this.props.contactInfo;
		//make data immutable
		storeHour = [].concat(storeHour); 
		//parse store hours to group them
		let groupedStoreHour = [];		
		//sort storehour
		storeHour.sort((a, b) => {
			return a.day_code - b.day_code;
		});
		storeHour.forEach((element) => {
			let groupLen = groupedStoreHour.length;
			if(groupLen === 0 || 
				 groupedStoreHour[groupLen - 1].open_hour !== element.open_hour ||
				 groupedStoreHour[groupLen - 1].close_hour !== element.close_hour) {
				let newEntry = {
					day_start: element.day,
					day_end: element.day,
					open_hour: element.open_hour,
					close_hour: element.close_hour
				};
				groupedStoreHour.push(newEntry);
			}
			else {
				groupedStoreHour[groupLen - 1].day_end = element.day;
			}
		});
		//build divs for store hour
		let storeHourDiv = groupedStoreHour.map((element, index) => {
			if(element.day_start === element.day_end){
				return (
					<div key={index}>
						<span>
							{element.day_start}: {formatTime(element.open_hour)} - {formatTime(element.close_hour)}
						</span>
					</div>
				);
			}
			return (
				<div key={index}>
					<span>
						{element.day_start} - {element.day_end}: {formatTime(element.open_hour)} - {formatTime(element.close_hour)}
					</span>
				</div>
			);
		});
		storeHourDiv = (
			<div class="header-phone">
				{storeHourDiv}
			</div>
		);
		//div for phone		
		let phoneDiv = ( 
			<div class="header-contact">
				<span>
					<i class="fa fa-phone red"></i> 
						{contactInfo.phone_number}
				</span>
			</div>
		);
		//start building header
		return (
			<div class="header-top">
				<div class="row">
					<div class="col-md-2 text-center">
						{phoneDiv}								
					</div>
					<div class="col-md-4 text-center">						
					</div>
					<div class="col-md-6 text-center">
						{storeHourDiv}
					</div>
				</div>	
			</div>
		);
	}
}

Header.propTypes = {
	storeHour: React.PropTypes.array.isRequired,
	contactInfo: React.PropTypes.object.isRequired
}