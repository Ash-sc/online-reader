import React from 'react';
import findIndex from 'lodash/findIndex';

export default class CharterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollChartList = this.scrollChartList.bind(this);
  }

  componentDidMount() {
    const { charterLink, viewType, charterList } = this.props.reducer;

    if (charterLink && viewType === 'content') {
      this.scrollChartList(charterList, charterLink);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { charterLink, viewType, charterList } = nextProps.reducer;
    if (charterLink !== this.props.reducer.charterLink && viewType === 'content') {
      this.scrollChartList(charterList, charterLink);
    }
  }

  scrollChartList(charterList, charterLink) {
    const index = findIndex(charterList, { href: charterLink });

    if (index >= 0) this.refs.charterList.scrollTop = 15 + (index * 55);
  }

  viewContent(href) {
    if (this.props.reducer.charterLink !== href || this.props.reducer.viewType !== 'content') {
      this.props.actions.changeViewType('content');
      this.props.actions.getArticleContent(`${this.props.reducer.articleLink}${href}`);
      this.props.actions.setCharterLink(href);
    }
  }

  render() {
    let viewType = this.props.reducer.viewType;

    if (this.props.reducer.viewType === 'content') {
      viewType = viewType.concat(this.props.reducer.toolSetting.fullScreen ? '-full-screen' : '');
    }

    return (
      <div
        className={`charter-list-body charter-list-for-${viewType}`}
        ref="charterList"
      >
        {this.props.reducer.charterList.map((item, i) =>
          <div
            className={`charter-item ${this.props.reducer.charterLink === item.href && this.props.reducer.viewType === 'content' ? 'charter-item-active' : ''}`}
            key={i}
            onClick={() => this.viewContent(item.href, i)}
          >
            {item.title}
          </div>
        )}
      </div>
    );
  }
}
