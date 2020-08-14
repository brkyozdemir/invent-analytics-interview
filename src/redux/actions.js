const domain = 'http://www.omdbapi.com/'
const apiKey = '24578b01';

export const fetchMovies = (search = 'movie', page) => {
  const url = `${domain}?s=${search}&apikey=${apiKey}&page=${page}`;
  return dispatch => {
    return fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: 'FETCH_MOVIE', payload: {
            search: json.Search,
            response: json.Response,
            total: json.totalResults
          }
        })
      })
  }
}

export const fetchDetails = (title) => {
  const url = `${domain}?t=${title}&apikey=${apiKey}`;
  return dispatch => {
    return fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: 'FETCH_DETAILS', payload: {
            actors: json.Actors,
            awards: json.Awards,
            boxOffice: json.BoxOffice,
            country: json.Country,
            dvd: json.DVD,
            director: json.Director,
            genre: json.Genre,
            language: json.Language,
            metascore: json.Metascore,
            plot: json.Plot,
            poster: json.Poster,
            production: json.Production,
            rated: json.Rated,
            ratings: json.Ratings,
            released: json.Released,
            response: json.Response,
            runtime: json.Runtime,
            title: json.Title,
            type: json.Type,
            website: json.Website,
            writer: json.Writer,
            year: json.Year,
            imdbID: json.imdbID,
            imdbRating: json.imdbRating,
            imdbVotes: json.imdbVotes
          }
        })
      })
  }
}