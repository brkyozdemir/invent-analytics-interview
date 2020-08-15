import React, { useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/index';
import './MovieDetails.scss'

const useStyles = makeStyles(theme => ({
  root: {
    width: '700px',
    margin: '0 auto',
    padding: '8px 24px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
  },
}));

const MovieDetails = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.onFetchDetails(props.detailTitle && props.detailTitle)
  }, [])

  return (
    <Paper className={classes.root}>
      {props.poster !== 'N/A' && <img className="detail__img" src={props.poster} alt={props.title && props.title} />}
      {props.title !== 'N/A' && <h3 className="span">{props.title}</h3>}
      {props.actors !== 'N/A' && <p><em>{props.actors}</em></p>}
      <hr />
      {props.awards !== 'N/A' && <p className="spn"><strong>Awards: </strong>{props.awards}</p>}
      {props.boxOffice !== 'N/A' && <p className="spn"><strong>Box Office: </strong>{props.boxOffice}</p>}
      {props.country !== 'N/A' && <p className="spn"><strong>Country: </strong>{props.country}</p>}
      {props.dvd !== 'N/A' && <p className="spn"><strong>DVD: </strong>{props.dvd}</p>}
      {props.director !== 'N/A' && <p className="spn"><strong>Director: </strong>{props.director}</p>}
      {props.genre !== 'N/A' && <p className="spn"><strong>Genre: </strong>{props.genre}</p>}
      {props.language !== 'N/A' && <p className="spn"><strong>Language: </strong>{props.language}</p>}
      {props.metascore !== 'N/A' && <p className="spn"><strong>Meta Score: </strong>{props.metascore}</p>}
      {props.plot !== 'N/A' && <p className="spn"><strong>Plot: </strong>{props.plot}</p>}
      {props.production !== 'N/A' && <p className="spn"><strong>Production: </strong>{props.production}</p>}
      {props.rated !== 'N/A' && <p className="spn"><strong>Rated: </strong>{props.rated}</p>}
      {props.released !== 'N/A' && <p className="spn"><strong>Released: </strong>{props.released}</p>}
      {props.response !== 'N/A' && <p className="spn"><strong>Response: </strong>{props.response}</p>}
      {props.runtime !== 'N/A' && <p className="spn"><strong>Runtime: </strong>{props.runtime}</p>}
      {props.type !== 'N/A' && <p className="spn"><strong>Type: </strong>{props.type}</p>}
      {props.website !== 'N/A' && <p className="spn"><strong>Website: </strong>{props.website}</p>}
      {props.writer !== 'N/A' && <p className="spn"><strong>Writer: </strong>{props.writer}</p>}
      {props.year !== 'N/A' && <p className="spn"><strong>Year: </strong>{props.year}</p>}
      {props.imdbRating !== 'N/A' && <p className="spn"><strong>IMDb Rating: </strong>{props.imdbRating}</p>}
      {props.imdbVotes !== 'N/A' && <p className="spn"><strong>IMDb Votes: </strong>{props.imdbVotes}</p>}
      <p><strong>Ratings</strong></p>
      <ul className="list__border">
        {props.ratings && props.ratings.map(data => (<li>{data.Source} <span className="tag__span">{data.Value}</span></li>))}
      </ul>
    </Paper >
  )
}

const mapStateToProps = state => {
  return {
    detailTitle: state.detailReducer.redirectTitle,
    actors: state.detailReducer.actors,
    awards: state.detailReducer.awards,
    boxOffice: state.detailReducer.boxOffice,
    country: state.detailReducer.country,
    dvd: state.detailReducer.dvd,
    director: state.detailReducer.director,
    genre: state.detailReducer.genre,
    language: state.detailReducer.language,
    metascore: state.detailReducer.metascore,
    plot: state.detailReducer.plot,
    poster: state.detailReducer.poster,
    production: state.detailReducer.production,
    rated: state.detailReducer.rated,
    ratings: state.detailReducer.ratings,
    released: state.detailReducer.released,
    response: state.detailReducer.response,
    runtime: state.detailReducer.runtime,
    title: state.detailReducer.title,
    type: state.detailReducer.type,
    website: state.detailReducer.website,
    writer: state.detailReducer.writer,
    year: state.detailReducer.year,
    imdbID: state.detailReducer.imdbID,
    imdbRating: state.detailReducer.imdbRating,
    imdbVotes: state.detailReducer.imdbVotes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchDetails: (title) => dispatch(actions.fetchDetails(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);