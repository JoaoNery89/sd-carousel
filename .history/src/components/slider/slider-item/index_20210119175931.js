import React from "react"

require("./style.scss")

const SliderItem = ({ movie, width }) => {
  return (
    <div className="container" style={{ width: `${width}%` }}>
      <img className="container-image"
        src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div className="bottom-left">{movie.title}</div>
      <div className="bottom-left">{movie.}</div>
    </div>
  )
}

export default SliderItem