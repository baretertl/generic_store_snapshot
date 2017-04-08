"use strict";
import React from "react";
import { IndexLink, Link } from "react-router";

export default class Navigation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		}
	}

	isActiveClass(path) {
		let routing = this.props.routing;
		return path === routing.locationBeforeTransitions.pathname;
	}

	toggleCollapse() {
		let collapsed = !this.state.collapsed;
		this.setState({collapsed})
	}

	render() {
		//component state
		let collapsed = this.state.collapsed;
		//redux store states
		let navigation = this.props.navigation;
		let storeName = this.props.storeName;
		//make data immutable
		navigation = [].concat(navigation); 
		//bind functions to use for events
		this.toggleCollapse = this.toggleCollapse.bind(this);
		//sort navigation
		navigation.sort((a, b) =>{
			return a.id - b.id;
		});
		let navMenus = navigation.map((element, index) => {
			let path = element.constant_code === "home" ? '/' : `/${element.constant_code}`;
			let imageUrl = `static/images/nav-menu/${element.constant_code}.jpg`;
			let active = this.isActiveClass(path);
			if(element.constant_code === "home") {
				return (
					<li key={index} onClick={this.toggleCollapse}>
						<IndexLink to={path}>
							<img class="img-responsive" src={imageUrl}  alt="" />
							<div class={active ? 'active' : ''}>
								{element.constant_value}
							</div>
						</IndexLink>
					</li>
				);
			}
			else{
				return (
					<li key={index} onClick={this.toggleCollapse}>
						<Link to={path}>
							<img class="img-responsive" src={imageUrl} alt="" />
							<div class={active ? 'active' : ''}>
								{element.constant_value}
							</div>
						</Link>
					</li>
				);
			}
		});
		//div for store name
		let storeNameDiv = (
			<div class="logo">
				<h1>
					{storeName}
				</h1>
			</div>
		);
		let navHeight = {
			maxHeight: collapsed ? "0px" : "500px"
		};
		return (
			<div class="row">
				<div class="col-md-4 col-sm-5">
					{storeNameDiv}
				</div>
				<div class="col-md-8 col-sm-7">
					<div class="navbar navbar-default navbar-right" role="navigation">
						<div class="container-fluid">
							<div class="navbar-header">
								<button type="button" class="navbar-toggle" onClick={this.toggleCollapse}>
									<span class="sr-only">Toggle navigation</span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
									<span class="icon-bar"></span>
								</button>
							</div>
							<div class="navbar-collapse nav-animate" style={navHeight} >
								<ul class="nav navbar-nav">
									{navMenus}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Navigation.propTypes = {
	routing: React.PropTypes.object.isRequired,
	navigation: React.PropTypes.array.isRequired,
	storeName: React.PropTypes.string.isRequired
}