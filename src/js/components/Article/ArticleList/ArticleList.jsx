import React from 'react';

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'center',
      activeIndex: -1,
    };
  }
  listGoLeft(index) {
    this.setState({ position: 'left', activeIndex: index });
    const articleLink = this.props.reducer.contentList[index].articleLink;
    this.props.actions.changeViewType('charter');
    this.props.actions.setArticleLink(articleLink);
    this.props.actions.getCharterList(articleLink, 'no');
  }

  render() {
    return (
      <div className={`article-list-body article-list-for-${this.props.reducer.viewType}`}>
        {this.props.reducer.contentList.map((item, i) =>
          <div
            key={i}
            className={`article-item ${this.state.activeIndex === i ? 'active-item' : ''}`}
            onClick={() => this.listGoLeft(i)}
          >
            <img
              src="http://web-site-files.ashshen.cc/online-reader/bg.jpg"
              alt={item.articleName}
              className="article-image"
            />
            <p className="article-title">{item.articleName}</p>
            <p className="article-author">作者：{item.authorName}</p>
            <p className="article-latest-charter">最新章节：{item.latestCharterName}</p>
            <p className="article-update-time">更新时间：20{item.updateTime}</p>
          </div>
        )}
      </div>
    );
  }
}
