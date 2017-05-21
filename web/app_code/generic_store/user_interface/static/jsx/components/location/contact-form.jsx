"use strict";
import React from "react";

export default class ContactForm extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: "",
			email: "",
			subject: "",
			message: ""
		}
		//bind functions
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSubject = this.setSubject.bind(this);
		this.setMessage = this.setMessage.bind(this);
		this.contactAction = this.contactAction.bind(this);
	}

	setName(event) {
		this.setState({name: event.target.value});
	}

	setEmail(event) {
		this.setState({email: event.target.value});
	}

	setSubject(event) {
		this.setState({subject: event.target.value});
	}

	setMessage(event) {
		this.setState({message: event.target.value});
	}

	contactAction() {
		let { contactAction } = this.props;
		let cloneState = Object.assign({}, this.state);
		contactAction(cloneState);
	}


	render() {
		let { address } = this.props;
		let { name, email, subject, message} = this.state;

		return(
			<div>
				<div class="input-group input-group-lg">
  				<span class="input-group-addon">Name</span>
  				<input class="form-control" type="text" value={name} onChange={this.setName} />
				</div>
				<br />
				<div class="input-group input-group-lg">
  				<span class="input-group-addon">Email</span>
  				<input class="form-control" type="text" value={email} onChange={this.setEmail} />
				</div>
				<br />
				<div class="input-group input-group-lg">
  				<span class="input-group-addon">Subject</span>
  				<input class="form-control" type="text" value={subject} onChange={this.setSubject} />
				</div>
				<br />
				<div class="input-group input-group-lg">
  				<span class="input-group-addon">Message</span>
  				<input class="form-control" type="text" value={message} onChange={this.setMessage} />
				</div>
				<br />
				<div class="text-left">
					<button class="btn btn-lg btn-primary" onClick={this.contactAction}>
						Submit
					</button>
				</div>
			</div>
		);
	}
}

ContactForm.propTypes = {
	contactAction: React.PropTypes.func.isRequired
}