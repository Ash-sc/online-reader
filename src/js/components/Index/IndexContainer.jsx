import React from 'react';
import Index from './Index';

export default class IndexContainer extends React.Component {
  render() {
    return <Index {...this.props} />;
  }
}
