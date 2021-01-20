import React from "react"

require("./style.scss")

const SliderItem = ({ movie, width }) => {
  return (
    <div className="container" style={{ width: `${width}%` }}>
      <div class="c1">
        <img className="item"
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="content">
          <div className="title">{movie.title}</div>
          <div className="subTitle">Subtítulo</div>
        </div>
      </div>
    </div>
  )
}

export default SliderItem