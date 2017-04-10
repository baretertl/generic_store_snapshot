"use strict";
//from https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663
//modified to make it simpler and take the api key as a prop

import React from 'react';
import ReactDOM from 'react-dom';
import cache from '../../utility/script-cache';
import GoogleApi from '../../utility/google-maps-api';

let GoogleMaps = (WrappedComponent) => {

  class ComponentWrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      //set state
      this.state = {
        loaded: false,
        google: null
      }
      //initial other menber variables
      this.scriptCache = null;
    }

    componentWillMount() {
      //retrieve the google api script
      let apiKey = this.props.apiKey;
      let libraries = this.props.libraries;
      //no api key
      if(!apiKey) {
        throw "Google Maps does not have an api key";
      }
      //start retrieval
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: apiKey,
          libraries: libraries
        })
      });
    }

    componentDidMount() {
      this.scriptCache.google.onLoad((err, tag) => {
        //script has been retrieved, set the state to tell the wrapped components it is ready
        this.setState({
          loaded: true,
          google: window.google
        })
      });
    }

    render() {
      let { loaded, google } = this.state;
      let props = Object.assign({}, this.props, {
        loaded: loaded,
        google: google
      })
      return (
        <WrappedComponent {...props} />
      )
    }
  }

  ComponentWrapper.propTypes = {
    apiKey: React.PropTypes.string.isRequired,
    libraries: React.PropTypes.array
  }

  ComponentWrapper.defaultProps = {
    libraries: ["places"]
  }

  return ComponentWrapper;
}

export default GoogleMaps;