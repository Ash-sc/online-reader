import React from 'react';
import Login from './Login';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LoginContainer extends React.Component {

  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state._shared.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

