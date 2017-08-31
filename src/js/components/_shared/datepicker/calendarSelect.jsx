import React from 'react';
// import moment from 'moment';
import CommonFn from './commonFn';

export default class CalendarSelect extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  // 日期是否可用
  isDateEnable(date) {
    const { minDate, maxDate } = this.props;
    return date >= minDate && date <= maxDate;
  }

  // 选择日期
  selectTime(date) {
    if (this.isDateEnable(date)) {
      this.props.selectTime(date);
    }
  }

  // 日期鼠标悬停
  mouseEnterTime(date, e) {
    if (this.isDateEnable(date)) {
      this.props.mouseEnterTime(date);
    } else {
      e.target.classList.add('disable');
    }
  }

  render() {
    const {
      calendarMonth,
      calendarChange,
      className,
      isSelected,
    } = this.props;
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <div className={className}>
        <div className="header-section">
          <span className="prev-year" onClick={() => calendarChange(-1, 'year')}>《</span>
          <span className="prev-month" onClick={() => calendarChange(-1, 'month')}>&lt;</span>
          <span className="next-month" onClick={() => calendarChange(1, 'month')}>&gt;</span>
          <span className="next-year" onClick={() => calendarChange(1, 'year')}>》</span>

          <span className="year-selector">
            <span className="current">{calendarMonth.split('-')[0]}年</span>
          </span>
          <span className="month-selector">
            <span className="current">{calendarMonth.split('-')[1]}月</span>
          </span>
        </div>
        <div className="calender-section">
          {weekdays.map((day, key) =>
            <div
              key={key}
              className="date-weekday"
            >{day}</div>
          )}
          {CommonFn.calendarArray(calendarMonth).map((item, key) =>
            <div
              key={key}
              className={`date-item ${isSelected(item)} ${item.indexOf(calendarMonth) !== 0 ? 'not-current-month' : ''}`}
              onClick={() => this.selectTime(item)}
              onMouseEnter={e => this.mouseEnterTime(item, e)}
            >{item.split('-')[2]}</div>
          )}
        </div>
      </div>
    );
  }
}
