import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieList/MovieDetails/MovieDetails';
import history from './history';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/movie" component={MovieList} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Redirect from="/" to="/movie" />
      </Switch>
    </Router>
  )
}

export default Routes;
