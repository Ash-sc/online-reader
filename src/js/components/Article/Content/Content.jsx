import React from 'react';
import findIndex from 'lodash/findIndex';

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.refs['content-span'].innerHTML = this.props.reducer.articleContent;
  }

  changeCharter(type) {
    const { charterList, charterLink } = this.props.reducer;
    const index = findIndex(charterList, { href: charterLink });
    if ((type === 'prev' && index !== 0) || (type === 'next' && index !== charterList.length - 1)) {
      const href = charterList[index + (type === 'prev' ? -1 : 1)].href;
      this.props.actions.getArticleContent(`${this.props.reducer.articleLink}${href}`);
      this.props.actions.setCharterLink(href);
      document.documentElement.scrollTop = document.body.scrollTop = -200;
    }
  }

  scrollContent(e) {
    const windowHeight = document.documentElement.clientHeight;
    const windowWidth = document.documentElement.clientWidth;

    if (windowWidth > 600) return false;

    const add = e.pageX > windowWidth / 2 ? (windowHeight - 20) : (20 - windowHeight);

    document.documentElement.scrollTop += add;
    document.body.scrollTop += add;

    return true;
  }

  render() {
    const { toolSetting } = this.props.reducer;
    return (
      <div className="article-content-body">
        <div
          className={`article-content${toolSetting.fullScreen ? ' full-screen-content' : ''}`}
        >
          <div ref="content-span" onClick={this.scrollContent}></div>
          <div className="operator">
            <div className="operator-btn" onClick={() => this.changeCharter('prev')}>&lt;&lt;上一章</div>
            <div className="operator-btn" onClick={() => this.changeCharter('next')}>下一章&gt;&gt;</div>
          </div>
        </div>
      </div>
    );
  }
}
