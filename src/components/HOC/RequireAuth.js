import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    state = {
      loggedIn: false
    }
    componentWillMount() {
      // Here, we want to check to see if `this.props.authenticated` is true
      // If it isn't, then redirect the user back to the /signin page
      if (this.props.authenticated) {
        this.setState({
          loggedIn: true,
        });
      } else {
        this.props.history.push('/signin');
      }
    }

    render() {
      // Here, check to see if `this.props.authenticated` is true
      // If it isn't, then we don't want this component to return anything
      // Else, render the component that was passed to this higher-order component
      
      if(this.state.loggedIn) {
        return <ComposedComponent/>
      } else {
        return <div>false</div>
      }
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};
