import React from 'react';
import Search from './Search/Search';
import ArticleList from './ArticleList/ArticleList';
import CharterList from './CharterList/CharterList';
import Content from './Content/Content';
import Tools from './Tools/Tools';

export default class Article extends React.Component {
  render() {
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
      </div>
    );
  }
}
