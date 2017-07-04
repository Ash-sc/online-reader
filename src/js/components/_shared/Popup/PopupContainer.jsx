import React from 'react';
import Popup from './Popup';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PopupContainer extends React.Component {

  render() {
    return (
      <Popup {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    popup: state._shared.popup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);

