const initialState = {
  actors: null,
  awards: null,
  boxOffice: null,
  country: null,
  dvd: null,
  director: null,
  genre: null,
  language: null,
  metascore: null,
  plot: null,
  poster: null,
  production: null,
  rated: null,
  ratings: null,
  released: null,
  response: null,
  runtime: null,
  title: null,
  type: null,
  website: null,
  writer: null,
  year: null,
  imdbID: null,
  imdbRating: null,
  imdbVotes: null,
  redirectTitle: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DETAILS":
      return {
        ...state,
        actors: action.payload.actors,
        awards: action.payload.awards,
        boxOffice: action.payload.boxOffice,
        country: action.payload.country,
        dvd: action.payload.dvd,
        director: action.payload.director,
        genre: action.payload.genre,
        language: action.payload.language,
        metascore: action.payload.metascore,
        plot: action.payload.plot,
        poster: action.payload.poster,
        production: action.payload.production,
        rated: action.payload.rated,
        ratings: action.payload.ratings,
        released: action.payload.released,
        response: action.payload.response,
        runtime: action.payload.runtime,
        title: action.payload.title,
        type: action.payload.type,
        website: action.payload.website,
        writer: action.payload.writer,
        year: action.payload.year,
        imdbID: action.payload.imdbID,
        imdbRating: action.payload.imdbRating,
        imdbVotes: action.payload.imdbVotes
      }
    case "TITLE":
      return {
        ...state,
        redirectTitle: action.payload.title
      }
    default:
      return state
  }
}

export default reducer;