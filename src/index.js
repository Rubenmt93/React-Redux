import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux'

import App  from './App';
import {asyncMiddleware} from './middleware/async'
import {reducer} from './features/todos'


const store= createStore(reducer, applyMiddleware(asyncMiddleware))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

    </Provider>
  </React.StrictMode>
);

reportWebVitals();
