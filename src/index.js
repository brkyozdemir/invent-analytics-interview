import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducers/index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
