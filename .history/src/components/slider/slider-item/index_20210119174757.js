import React from "react"

require("./style.scss")

const SliderItem = ({ movie, width }) => {
  return (
    <div className="slider-item" style={{ width: `${width}%` }}>
      <div className="slider-item">
        <img className="slider-image"
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="carousel-inner">
          <h3>{movie.title}</h3>
          <p>Filme</p>
        </div>
      </div>
    </div>
  )
}

export default SliderItem