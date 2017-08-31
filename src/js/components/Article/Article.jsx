import React from 'react';
import Search from './Search/Search';
import ArticleList from './ArticleList/ArticleList';
import CharterList from './CharterList/CharterList';
import Content from './Content/Content';
import Tools from './Tools/Tools';
import DatePicker from 'components/_shared/datepicker/';

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: '2017-08-01',
      endDate: '2018-01-06',
    };
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <div
        className="article-body"
        style={{ backgroundColor: this.props.reducer.toolSetting.bgColor }}
      >
        <div className="search-section">
          <Search {...this.props} />
          <ArticleList {...this.props} />
          {['charter', 'content'].includes(this.props.reducer.viewType) &&
            <CharterList {...this.props} />
          }
          {this.props.reducer.viewType === 'content' && this.props.reducer.articleContent.length > 0 &&
            <Content {...this.props} />
          }
          {this.props.reducer.viewType === 'content' &&
            <Tools {...this.props} />
          }
        </div>
        <span>开始时间：{startDate}</span>
        <br />
        <span>结束时间：{endDate}</span>
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          changeStartDate={date => this.setState({ startDate: date })}
          changeEndDate={date => this.setState({ endDate: date })}
        />
      </div>
    );
  }
}
