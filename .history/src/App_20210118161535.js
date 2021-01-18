import React, { Component } from "react"
import Slider from "./components/slider/slider.js"
import './scss/App.scss'

require("./scss/App.scss")

const apiKey = '2b886709ca77f09ea739fe83837f8f13'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
    }
  }

  async componentDidMount() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
    const data = await res.json()

    this.setState({ movies: data.results })
  }

  render() {
    const { movies } = this.state

    return (
      <div className="App">
        <h1 className="App-title">
          <span>SDFlix</span>
        </h1>
        <div>
          <h1>s</h1>
        </div>
        <Slider movies={movies} />
      </div>
    )
  }

}

export default App