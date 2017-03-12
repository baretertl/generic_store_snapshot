import React from "react";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.title} 
        </h1>
        <span class="glyphicon glyphicon-asterisk"></span>
      </div>
    );
  }
}