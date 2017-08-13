import React, { Component } from 'react';

class Page extends Component {
  
  render() {
    return (
      <div>
        <h3>
          This is the {this.props.currentPage} page
        </h3>
      </div>
    );
  }
}

export default Page;