import React from 'react';
import Search from './Search/Search';
import ArticleList from './ArticleList/ArticleList';
import CharterList from './CharterList/CharterList';
import Content from './Content/Content';
import Tools from './Tools/Tools';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'search',
      articleLink: '',
      charterHref: '',
      currentSetting: {
        bgColor: '#eef8fd',
      },
    };
  }

  // 搜索小说
  searchArticle(searchKey) {
    this.setState({
      currentSetting: {
        bgColor: '#eef8fd',
      },
    });
    if (this.state.viewType === 'content') {
      this.setState({ viewType: 'charter' });
    } else {
      this.setState({ viewType: 'article' });
      this.props.actions.searchArticle(searchKey);
    }
  }

  // 查看小说章节
  viewArticleDetail(index, type) {
    this.setState({
      viewType: 'charter',
      articleLink: this.props.reducer.contentList[index].articleLink,
    });
    this.props.actions.getCharterList(this.props.reducer.contentList[index].articleLink, type);
  }

  // 查看小说内容
  viewContent(href) {
    this.setState({
      viewType: 'content',
      charterHref: href,
    });
    this.props.actions.getArticleContent(`${this.state.articleLink}${href}`);
  }

  changeSetting(type, value) {
    const currentSetting = this.state.currentSetting;
    currentSetting[type] = value;
    this.setState({ currentSetting });
  }

  render() {
    return (
      <div
        className="article-body"
        style={{ backgroundColor: this.state.currentSetting.bgColor }}
      >
        <div className="search-section">
          <Search
            searchArticle={searchKey => this.searchArticle(searchKey)}
            viewType={this.state.viewType}
          />
          <ArticleList
            data={this.props.reducer.contentList}
            viewArticleDetail={index => this.viewArticleDetail(index)}
            viewType={this.state.viewType}
          />
          {['charter', 'content'].includes(this.state.viewType) &&
            <CharterList
              data={this.props.reducer.charterList}
              viewContent={href => this.viewContent(href)}
              viewType={this.state.viewType}
              currentSetting={this.state.currentSetting}
            />
          }
          {this.state.viewType === 'content' && this.props.reducer.articleContent.length > 0 &&
            <Content
              data={this.props.reducer.articleContent}
              currentSetting={this.state.currentSetting}
            />
          }
          {this.state.viewType === 'content' &&
            <Tools
              currentSetting={this.state.currentSetting}
              changeSetting={(type, value) => this.changeSetting(type, value)}
            />
          }
        </div>
      </div>
    );
  }
}
