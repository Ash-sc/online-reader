import React from 'react';
import DevTools from 'js/dev/devTools';

import PopupContainer from 'components/_shared/Popup/PopupContainer';

export default class App extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.node,
    };
  }

  render() {
    return (
      <div className="app-root">
        {process.env.ENVIRONMENT === 'local' && (
          <DevTools />
        )}
        <PopupContainer />
        {this.props.children || 'No Content ?'}
      </div>
    );
  }
}
