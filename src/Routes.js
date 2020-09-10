import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieList/MovieDetails/MovieDetails';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/movie" component={MovieList} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Redirect from="/" to="/movie" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
