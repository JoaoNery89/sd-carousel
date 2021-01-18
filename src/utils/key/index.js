let apiKey = '2b886709ca77f09ea739fe83837f8f13'

if (process.env.NODE_ENV !== "production") {
  apiKey = process.env.REACT_APP_MOVIE_KEY
} else {
  apiKey = process.env.MOVIE_KEY
}

export default apiKey