import React from 'react';

export default class Loading extends React.Component {

  render() {
    return (
      <div className="spinner-bg">
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    );
  }
}
