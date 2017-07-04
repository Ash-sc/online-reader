import React from 'react';

class Popup extends React.Component {

  render() {
    // const popupIsOpenClass = this.props.popup.isOpen ? 'popup-bg' : null;
    return (
      <div className={`popup ${this.props.popup.isOpen ? 'popup-open' : 'popup-closed'}`}>
        <div className="popup-bg" />
        <div className={`popup-container ${this.props.popup.cssClass}`}>
          <div className="popup-content">
            <div className="popup-block">
              <span className="popup-close-button" onClick={this.props.actions.closePopup}><span className="icon icon-cross"></span></span>
              {this.props.popup.content || 'No Content ?'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
