import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
<BrowserRouter>
<MuiThemeProvider>
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  </MuiThemeProvider>
 </BrowserRouter>
  , document.querySelector('.container'));
