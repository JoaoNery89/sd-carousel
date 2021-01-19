import React from "react"

require("./style.scss")

const SliderItem = ({ movie, width }) => {
  return (
    <div className="slider-item" style={{ width: `${width}%` }}>
      <div className="slider-title">{movie.title}</div>
      <img className="slider-image"
        src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        
      />
    </div>
  )
}

export default SliderItem