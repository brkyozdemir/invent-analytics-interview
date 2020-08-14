import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieList/MovieDetails/MovieDetails';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/movie" component={MovieList}/>
      <Route exact path="/movie/:id" component={MovieDetails}/>
      <Redirect from="/" to="/movie" />
    </Switch>
  )
}

export default Routes;
