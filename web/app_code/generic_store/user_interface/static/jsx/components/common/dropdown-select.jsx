"use strict";
import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export default class DropdownSelect extends React.Component {

	constructor(props) {
		super(props);
		this.state = { selectedValue: null }
	}

	valueChanged(newValue, newObj) {
		this.setState({ selectedValue: newValue});
		if(this.props.onChange) {
			this.props.onChange(newValue, newObj);
		}
	}

	render() {	
		//props
		let options = this.props.options;
		let defaultTitle = this.props.defaultTitle;
		let id = this.props.id;
		//bind functions needed
		this.valueChanged = this.valueChanged.bind(this);
		//create the menu items
		let displayTitle = defaultTitle;
		let maxTitleLength = displayTitle.length;
		let dropdownOpts = options.map((element, index) => {
			//check max length to be used later
			if(element.text.length > maxTitleLength){
				maxTitleLength = element.text.length ;
			}
			//check if value is selected
			if(this.state.selectedValue === element.value || options.length === 1) {
				displayTitle = element.text;
				return (
					<MenuItem key={index} onClick={() => {this.valueChanged(element.value, element.object);}} active>
						{ element.text }
					</MenuItem>
				);
			}
			return (
				<MenuItem key={index} onClick={() => {this.valueChanged(element.value, element.object);}}>
					{ element.text }
				</MenuItem>
			);
		});
		return (
			<DropdownButton bsStyle={'default'} title={displayTitle} id={id}>
				{ dropdownOpts }
			</DropdownButton>
		);
	}
}

DropdownSelect.propTypes = {
	onChange: React.PropTypes.func,
	options: React.PropTypes.array.isRequired,
	defaultTitle: React.PropTypes.string.isRequired,
	id: React.PropTypes.string.isRequired
}

DropdownSelect.defaultProps = {
	onChange: () => {}
}