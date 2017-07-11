import React from 'react';

export default class BgColorSetting extends React.Component {
  render() {
    const colors = ['#eef8fd', '#cfdecb', '#ede4cc', '#181818', '#f4ddd1', '#eac1ce'];
    return (
      <div className={`bg-setting-body ${this.props.className}`}>
        {colors.map((color, i) =>
          <span
            key={i}
            className={`icon-square-rounded${this.props.reducer.toolSetting.bgColor === color ? ' active-span' : ''}`}
            style={{ color }}
            onClick={() => this.props.actions.changeToolSetting({ bgColor: color })}
          />
        )}
      </div>
    );
  }
}
