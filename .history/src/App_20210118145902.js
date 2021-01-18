import React, { Component } from "react"
import Slider from "./components/slider/slider.js"
import apiKey from "./utils/key"
import './scss/App.scss'

require("./scss/App.scss")

export class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
    );
    const data = await res.json();

    this.setState({ movies: data.results });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="App">
        <h1 className="App-title">
          <span>Netflix</span> Slider
        </h1>
        <Slider movies={movies} />
      </div>
    );
  }
}

export default App