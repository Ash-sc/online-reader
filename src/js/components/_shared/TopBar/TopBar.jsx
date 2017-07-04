import React from 'react';
import { Link } from 'react-router';

export default class TopBar extends React.Component {
  render() {
    const userInfo = localStorage.userInfo || {};
    return (
      <div>
        <div className="top-bar unselectable">
          <Link to="/" className="back-to-index" unselectable="on">ASHSHEN~</Link>
          {userInfo.userName ?
            <div className="user-avatar">logo</div> :
            <span className="icon icon-face" />
          }
        </div>
        {this.props.children || 'No Content ?'}
      </div>
    );
  }
}
