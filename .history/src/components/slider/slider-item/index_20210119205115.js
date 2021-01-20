import React from "react"

require("./style.scss")

const SliderItem = ({ movie, width }) => {
  return (
    
      <div class="c">
        <img className="b"
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