import React from 'react';
import QRCode from 'qrcode.react';
import BgColorSetting from './BgColorSetting';

export default class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: 'initial',
      currentSetting: '',
    };
  }

  setting(type) {
    this.setState({ currentSetting: this.state.currentSetting === type ? '' : type });
    switch (type) {
      case 'enlarge':
      case 'reduce':
        this.props.actions.changeToolSetting({ fullScreen: type === 'enlarge' });
        break;
      default:
        break;
    }
  }

  showOrHideSetting() {
    const currentStatus = this.state.currentStatus === 'initial' ? 'show-setting' : 'initial';
    this.setState({ currentStatus, currentSetting: '' });
  }

  render() {
    const overflowTools = () => {
      if (this.state.currentStatus !== 'initial' && this.state.currentSetting !== '') {
        return 'inherit';
      }
      return 'hidden';
    };
    return (
      <div
        className={`tools-body ${this.state.currentStatus === 'initial' ? '' : 'tools-body-active'}`}
        style={{ overflow: overflowTools() }}
      >
        <span
          className={`${this.state.currentStatus === 'initial' ? 'icon-cog' : 'icon-cross2'}`}
          onClick={() => this.showOrHideSetting()}
        />
        {this.state.currentStatus !== 'initial' &&
          <span
            className="icon-enlarge"
            onClick={() => this.setting('enlarge')}
          />
        }
        {this.state.currentStatus !== 'initial' &&
          <span
            className="icon-fullscreen-exit"
            onClick={() => this.setting('reduce')}
          />
        }
        {this.state.currentStatus !== 'initial' &&
          <span
            className="icon-font"
            onClick={() => this.setting('font')}
          />
        }
        {this.state.currentStatus !== 'initial' &&
          <span
            onClick={() => this.setting('background')}
            style={{ color: this.props.reducer.toolSetting.bgColor }}
            className={`icon-square-rounded ${this.state.currentSetting === 'background' ? 'active-span' : ''}`}
          >
            <BgColorSetting
              className={this.state.currentSetting === 'background' ? 'show-bg-setting' : 'hide-bg-setting'}
              {...this.props}
            />
          </span>
        }
        {this.state.currentStatus !== 'initial' &&
          <span
            onClick={() => this.setting('qr-code')}
            className={`icon-qrcode ${this.state.currentSetting === 'qr-code' ? 'active-span' : ''}`}
          >
            {this.state.currentSetting === 'qr-code' &&
              <QRCode value="http://facebook.github.io/react/" />
            }
          </span>
        }
      </div>
    );
  }
}
