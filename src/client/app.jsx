import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { LayoutWithData } from './scenes/layout';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise'; // allows promise
import multiMiddleware from 'redux-multi'; // allows multiple actions in the result
import thunkMiddleware from 'redux-thunk'; // allows multiple dispatch to be called multiple times

import { connect, subscribeToTxs } from './services/socket';
import { newTxs } from './redux/reducers/tx-reducers';

import { newTx } from './redux/actions/tx-actions';

const store = createStore(
  combineReducers({ newTxs }),
  applyMiddleware(thunkMiddleware, promiseMiddleware, multiMiddleware)
);

connect().then(() => subscribeToTxs(tx => store.dispatch(newTx(tx))));

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <LayoutWithData />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
