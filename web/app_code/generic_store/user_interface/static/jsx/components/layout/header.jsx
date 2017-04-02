"use strict";
import React from "react";

export default class Header extends React.Component {

	formatTime(timeString) {
		let timeArr = timeString.split(":").map((element) => { return parseInt(element, 10) });
		if(timeArr[0] > 12) {
			return `${timeArr[0] - 12}:${timeArr[1] !== 0 ? timeArr[1]: "00" } pm`;
		}
		return `${timeArr[0]}:${timeArr[1] !== 0 ? timeArr[1]: "00" } am`;
	}

	render() {
		//redux store states
		let StoreInfoState = this.props.StoreInfoState;		
		if (StoreInfoState.location === null) {
			//no data yet, return empty div
			return (<div></div>);
		}
		let { location, store_hour, contact_info, store_name } = this.props.StoreInfoState;
		store_hour = [].concat(store_hour); //make sure ste state does not get altered
		//parse store hours to group them
		let groupedStoreHour = [];		
		store_hour.sort((a, b) => {
			return a.day_code - b.day_code;
		});
		store_hour.forEach((element) => {
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
							{element.day_start}: {this.formatTime(element.open_hour)} - {this.formatTime(element.close_hour)}
						</span>
					</div>
				);
			}
			return (
				<div key={index}>
					<span>
						{element.day_start} - {element.day_end}: {this.formatTime(element.open_hour)} - {this.formatTime(element.close_hour)}
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
						{contact_info.phone_number}
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