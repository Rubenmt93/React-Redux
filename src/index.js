import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux'

const store= createStore((state= 0, action)=>{ //Es un reducer????
  //action= {type: 'tipo de accion', payload :any}
  switch(action.type){
    case 'incrementar':{
      return state+1
    }
    case 'decrementar':{
      return state-1
    }
    default: 
      return state
  }
  
})
console.log(store.getState());
store.dispatch({ type: 'lala'})
console.log(store.getState());
store.dispatch({ type: 'incrementar'})
console.log(store.getState());
store.dispatch({ type: 'decrementar'})
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
