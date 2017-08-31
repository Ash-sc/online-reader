import moment from 'moment';

export default class CommonFn {

  static calendarArray(date) {
    moment.locale('zh-cn');
    const dates = [];
    for (let i = 0; i < 42; i += 1) {
      const startDate = moment(date).date(1);
      dates[i] = startDate.weekday(i).format('YYYY-MM-DD');
    }
    return dates;
  }

  static ym(date) {
    return moment(date).format('YYYY-MM');
  }

  static ymd(date) {
    return moment(date).format('YYYY-MM-DD');
  }

}
