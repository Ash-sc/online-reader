import React from 'react';
import Search from './Search/Search';
import ArticleList from './ArticleList/ArticleList';
import CharterList from './CharterList/CharterList';
import Content from './Content/Content';
import Tools from './Tools/Tools';
import DatePicker from 'date-range-for-react';

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
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
