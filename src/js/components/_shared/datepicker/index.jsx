import React from 'react';
import moment from 'moment';
import CommonFn from './commonFn';

export default class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startMonth: moment().format('YYYY-MM'),
      endMonth: moment().add(1, 'months').format('YYYY-MM'),
      isSelecting: false,
    };
  }

  dateSectionDisplay(type) {
    this.setState({ isSelecting: type === 'show' });
  }

  render() {
    const { startMonth, endMonth, isSelecting } = this.state;
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <div className="date-picker-body">
        <div className="input-section" onClick={() => this.dateSectionDisplay('show')}>
          <input type="text" className="start-time" />
          <span className="clip-span">——</span>
          <input type="text" className="end-time" />
        </div>
        <div className={`date-section ${isSelecting && 'date-section-show'}`}>
          <div className="date-start-section">
            <div className="header-section">
              <span className="year-selector">
                <span className="prev">&lt;</span>
                <span className="current">{startMonth.split('-')[0]}年</span>
                <span className="next">&gt;</span>
              </span>
              <span className="month-selector">
                <span className="prev">&lt;</span>
                <span className="current">{startMonth.split('-')[1]}月</span>
                <span className="next">&gt;</span>
              </span>
            </div>
            <div className="calender-section">
              {weekdays.map((day, key) =>
                <div
                  key={key}
                  className="date-weekday"
                >{day}</div>
              )}
              {CommonFn.calendarArray(startMonth).map((item, key) =>
                <div
                  key={key}
                  className={`date-item ${item.indexOf(startMonth) !== 0 && 'not-current-month'}`}
                >{item.split('-')[2]}</div>
              )}
            </div>
          </div>
          <div className="date-end-section">
            <div className="header-section">
              <span className="year-selector">
                <span className="prev">&lt;</span>
                <span className="current">{endMonth.split('-')[0]}年</span>
                <span className="next">&gt;</span>
              </span>
              <span className="month-selector">
                <span className="prev">&lt;</span>
                <span className="current">{endMonth.split('-')[1]}月</span>
                <span className="next">&gt;</span>
              </span>
            </div>
            <div className="calender-section">
              {weekdays.map((day, key) =>
                <div
                  key={key}
                  className="date-weekday"
                >{day}</div>
              )}
              {CommonFn.calendarArray(endMonth).map((item, key) =>
                <div
                  key={key}
                  className={`date-item ${item.indexOf(endMonth) !== 0 && 'not-current-month'}`}
                >{item.split('-')[2]}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
