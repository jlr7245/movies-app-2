import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Page from './components/Page';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
      currentMovieId: null,
    }
    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    console.log('click');
    this.setState({
      currentPage: page,
    })
  }

  render() {
    return (
      <div className="App">
        <Header setPage={this.setPage} />
        <Page currentPage={this.state.currentPage} />
        <Footer />
      </div>
    );
  }
}

export default App;
