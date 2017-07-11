import React from 'react';
// style={{ animationDelay: `${i * 0.1}s` }}

export default class CharterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: -1,
    };
  }

  componentDidMount() {
    // todo: 滚动时改变章节目录布局
  }

  viewContent(href, index) {
    if (this.state.activeIndex !== index || this.props.reducer.viewType !== 'content') {
      this.setState({ activeIndex: index });
      this.props.actions.changeViewType('content');
      this.props.actions.getArticleContent(`${this.props.reducer.articleLink}${href}`);
    }
  }

  render() {
    return (
      <div className={`charter-list-body charter-list-for-${this.props.reducer.viewType}`}>
        {this.props.reducer.charterList.map((item, i) =>
          <div
            className={`charter-item ${this.state.activeIndex === i && this.props.reducer.viewType === 'content' ? 'charter-item-active' : ''}`}
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
