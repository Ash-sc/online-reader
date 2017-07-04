import React from 'react';
import Article from './Article';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

class ArticleContainer extends React.Component {
  render() {
    return <Article {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.article.article,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
