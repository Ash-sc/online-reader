import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.changeToolSetting({ bgColor: '#eef8fd' });
    if (this.props.reducer.viewType === 'content') {
      this.props.actions.changeViewType('charter');
    } else {
      this.props.actions.changeViewType('article');
      this.props.actions.searchArticle(this.state.searchKey);
    }
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          className={`search-component search-component-for-${this.props.reducer.viewType}`}
          maxLength="20"
          type="text"
          value={this.state.searchKey}
          onChange={e => this.setState({ searchKey: e.target.value })}
          placeholder="试着搜点什么"
        />
        <button className="search-btn" type="submit"><span className={this.props.reducer.viewType === 'content' ? 'icon-arrow-left' : 'icon-search'} /></button>
      </form>
    );
  }
}
