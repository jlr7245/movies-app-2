import React, { Component } from 'react';

class MovieAddForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      genre: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="add">
        <form onSubmit={(e) => this.props.handleMovieSubmit(e, this.state.title, this.state.desc, this.state.genre)}>
          <label> Title
            <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label> Description
            <input type="text" name="desc" placeholder="Description" value={this.state.desc} onChange={this.handleInputChange} />
          </label>
          <label> Genre
            <input type="text" name="genre" placeholder="Genre" value={this.state.genre} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Add Movie" />
        </form>
      </div>
    )
  }
}

export default MovieAddForm;