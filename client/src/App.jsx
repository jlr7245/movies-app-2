import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';

import MoviesList from './components/MoviesList';

import User from './components/User';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
      currentMovieId: null,
      movieData: null,
    }
    this.setPage = this.setPage.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);
    this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);
    this.selectEditedMovie = this.selectEditedMovie.bind(this);
  }

  // LIFECYCLE

  componentDidMount() {
    axios.all([axios.get('/movies'), axios.get('/user/test')])
      .then(res => {
        console.log(res);
        this.setState({
          movieData: res[0].data.data,
          auth: res[1].data.auth,
          user: res[1].data.user,
        });
      }).catch(err => console.log(err));
  }

  // PAGINATION

  setPage(page) {
    console.log('click');
    this.setState({
      currentPage: page,
    })
  }

  decideWhichPage() {
    switch(this.state.currentPage) {
      case 'home':
        return <Home />;
        break;
      case 'login':
        return <Login handleLoginSubmit={this.handleLoginSubmit} />;
        break;
      case 'register':
        return <Register handleRegisterSubmit={this.handleRegisterSubmit} />;
        break;
      case 'movies':
        return (<MoviesList 
          movieData={this.state.movieData} 
          handleMovieSubmit={this.handleMovieSubmit} 
          handleMovieEditSubmit={this.handleMovieEditSubmit}
          selectEditedMovie={this.selectEditedMovie}
          currentMovieId={this.state.currentMovieId}  />)
        break;
      case 'user':
          if (this.state.auth) return <User user={this.state.user} />
          return <p>not logged in</p>
          break;
      default:
        break;
    }
  }

  // AUTH

  handleLoginSubmit(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
      });
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit(e, username, password, email) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
        currentPage: 'home',
      });
    }).catch(err => console.log(err));
  }

  logOut() {
    axios.get('/auth/logout')
      .then(res => {
        this.setState({
          auth: false,
          currentPage: 'home',
        })
      }).catch(err => console.log(err));
  }

  // MOVIES

  handleMovieSubmit(e, title, description, genre) {
    e.preventDefault();
    axios.post('/movies', {
      title,
      description,
      genre,
    }).then(res => {
      this.resetMovies();
    }).catch(err => console.log(err));
  }

  handleMovieEditSubmit(e, title, description, genre) {
    e.preventDefault();
    axios.put(`/movies/${this.state.currentMovieId}`, {
      title,
      description,
      genre,
    }).then(res => {
      this.resetMovies();
    }).catch(err => console.log(err));
  }

  selectEditedMovie(id) {
    this.setState({
      currentMovieId: id,
    })
  }

  resetMovies() {
    axios.get('/movies')
      .then(res => {
        this.setState({
          movieData: res.data.data,
          currentMovieId: null,
        })
      }).catch(err => console.log(err));
  }

  // RENDER

  render() {
    return (
      <div className="App">
        <Header setPage={this.setPage} logOut={this.logOut} />
        {this.decideWhichPage()}
        <Footer />
      </div>
    );
  }
}

export default App;
