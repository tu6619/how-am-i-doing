import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import { Router, browserHistory } from 'react-router'
import reducers from './reducers/reducers_index.js'
import Routes from './routes.js'

const configureStore = (initialState) => {
  return createStore(reducers, initialState, compose(
    applyMiddleware(promise),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
}
const store = configureStore()

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.getElementById('app')
)
