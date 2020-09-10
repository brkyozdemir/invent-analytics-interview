import React, { useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
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

  const { actors, awards, boxOffice, country, dvd,
    director, genre, language, metascore, plot,
    poster, production, rated, ratings, released,
    response, runtime, title, type, website, writer,
    year, imdbRating, imdbVotes } = useSelector(state => state.detailReducer);
  const detailTitle = useSelector(state => state.detailReducer.redirectTitle);
  const movieDispatch = useDispatch();

  useEffect(() => {
    movieDispatch(actions.fetchDetails(detailTitle && detailTitle));
  }, [detailTitle, movieDispatch])

  return (
    <Paper className={classes.root}>
      {poster !== 'N/A' && <img className="detail__img" src={poster} alt={title && title} />}
      {title !== 'N/A' && <h3 className="span">{title}</h3>}
      {actors !== 'N/A' && <p><em>{actors}</em></p>}
      <hr />
      {awards !== 'N/A' && <p className="spn"><strong>Awards: </strong>{awards}</p>}
      {boxOffice !== 'N/A' && <p className="spn"><strong>Box Office: </strong>{boxOffice}</p>}
      {country !== 'N/A' && <p className="spn"><strong>Country: </strong>{country}</p>}
      {dvd !== 'N/A' && <p className="spn"><strong>DVD: </strong>{dvd}</p>}
      {director !== 'N/A' && <p className="spn"><strong>Director: </strong>{director}</p>}
      {genre !== 'N/A' && <p className="spn"><strong>Genre: </strong>{genre}</p>}
      {language !== 'N/A' && <p className="spn"><strong>Language: </strong>{language}</p>}
      {metascore !== 'N/A' && <p className="spn"><strong>Meta Score: </strong>{metascore}</p>}
      {plot !== 'N/A' && <p className="spn"><strong>Plot: </strong>{plot}</p>}
      {production !== 'N/A' && <p className="spn"><strong>Production: </strong>{production}</p>}
      {rated !== 'N/A' && <p className="spn"><strong>Rated: </strong>{rated}</p>}
      {released !== 'N/A' && <p className="spn"><strong>Released: </strong>{released}</p>}
      {response !== 'N/A' && <p className="spn"><strong>Response: </strong>{response}</p>}
      {runtime !== 'N/A' && <p className="spn"><strong>Runtime: </strong>{runtime}</p>}
      {type !== 'N/A' && <p className="spn"><strong>Type: </strong>{type}</p>}
      {website !== 'N/A' && <p className="spn"><strong>Website: </strong>{website}</p>}
      {writer !== 'N/A' && <p className="spn"><strong>Writer: </strong>{writer}</p>}
      {year !== 'N/A' && <p className="spn"><strong>Year: </strong>{year}</p>}
      {imdbRating !== 'N/A' && <p className="spn"><strong>IMDb Rating: </strong>{imdbRating}</p>}
      {imdbVotes !== 'N/A' && <p className="spn"><strong>IMDb Votes: </strong>{imdbVotes}</p>}
      {ratings && <><p><strong>Ratings</strong></p>
        <ul className="list__border">
          {ratings.map((data, index) => (<li key={index}>{data.Source} <span className="tag__span">{data.Value}</span></li>))}
        </ul></>}
    </Paper >
  )
}

export default MovieDetails;