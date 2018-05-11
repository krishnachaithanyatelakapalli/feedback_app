// Data layer control (redux)
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

// Development Use
import axios from 'axios'
window.axios = axios;

// 'Store' is used to enable gloabl usage of data
const store = createStore(reducers,{},applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider
    // automatically updates the states
    store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));