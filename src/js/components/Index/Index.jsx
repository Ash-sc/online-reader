import React from 'react';

export default class Index extends React.Component {

  changeRoute(type) {
    switch (type) {
      case 'blog':
        this.context.router.push('/blog');
        break;
      case 'tools':
        this.context.router.push('/tools/list');
        break;
      case 'games':
        this.context.router.push('/games/winmine');
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="index-content">
        content here!
      </div>
    );
  }
}

Index.contextTypes = {
  router: React.PropTypes.object,
};
