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
    this.props.searchArticle(this.state.searchKey);
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          className={`search-component search-component-for-${this.props.viewType}`}
          maxLength="20"
          type="text"
          value={this.state.searchKey}
          onChange={e => this.setState({ searchKey: e.target.value })}
          placeholder="试着搜点什么"
        />
        <button className="search-btn" type="submit"><span className={this.props.viewType === 'content' ? 'icon-arrow-left' : 'icon-search'} /></button>
      </form>
    );
  }
}
