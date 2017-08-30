import React from 'react';
import moment from 'moment';
import CommonFn from './commonFn';
import min from 'lodash/min';
import max from 'lodash/max';

export default class DatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startMonth: moment().format('YYYY-MM'), // 默认第一月份
      endMonth: moment().add(1, 'months').format('YYYY-MM'), // 默认第二月份
      showCalendar: false, // 是否显示日历
      startTime: '', // 默认开始时间
      endTime: '', // 默认结束时间
      hoverTime: '', // 鼠标悬停的日期
      isSelecting: '', //选择状态位：'', 'startTime', 'endTime'
    };
  }

  // 显示、隐藏日历
  dateSectionDisplay(type) {
    if (this.state.showCalendar !== (type === 'show')) {
      this.setState({
        showCalendar: type === 'show',
        isSelecting: type === 'show' ? 'startTime' : '',
      });
    }
  }

  // 点击日历日期，选择时间
  selectTime(time) {
    if (this.state.isSelecting === 'startTime') {
      this.setState({
        startTime: time,
        endTime: time,
        isSelecting: 'endTime',
        hoverTime: time,
      });
    } else if (this.state.isSelecting === 'endTime') {
      let { startTime, endTime } = this.state;
      if (startTime > time) {
        endTime = startTime;
        startTime = time;
      } else {
        endTime = time;
      }
      this.setState({
        startTime,
        endTime,
        isSelecting: 'startTime',
      });
    }
  }

  // 鼠标悬停日期，选中区域
  mouseEnterTime(time) {
    if (this.state.isSelecting === 'endTime') {
      this.setState({ hoverTime: time });
    }
  }

  // 日期是否被选中
  isSelected(date) {
    const { startTime, endTime, hoverTime } = this.state;
    if (date > min([startTime, endTime, hoverTime]) && date < max([startTime, endTime, hoverTime])) {
      return 'selected';
    } else if (date === min([startTime, endTime, hoverTime]) || date === max([startTime, endTime, hoverTime])) {
      return 'start-or-end-selected';
    }
    return '';
  }

  render() {
    const { startMonth, endMonth, showCalendar } = this.state;
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <div className="date-picker-body">
        <div className="input-section" onClick={() => this.dateSectionDisplay('show')}>
          <input type="text" className="start-time" value={this.state.startTime} />
          <span className="clip-span">——</span>
          <input type="text" className="end-time" value={this.state.endTime} />
        </div>
        <div className={`date-section ${showCalendar && 'date-section-show'}`}>
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
                  className={`date-item ${this.isSelected(item)} ${item.indexOf(startMonth) !== 0 ? 'not-current-month' : ''}`}
                  onClick={() => this.selectTime(item)}
                  onMouseEnter={() => this.mouseEnterTime(item)}
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
                  className={`date-item ${this.isSelected(item)} ${item.indexOf(endMonth) !== 0 ? 'not-current-month' : ''}`}
                  onClick={() => this.selectTime(item)}
                  onMouseEnter={() => this.mouseEnterTime(item)}
                >{item.split('-')[2]}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
