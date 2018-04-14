import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import 'material-ui'
import React, { Fragment } from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import reduxThunk from 'redux-thunk';


import NavBar from './NavBar'
import Instructions from './Instructions'
import Wireframe from './Wireframe'
import Requests from '../components/Requests'

import reducers from './reducers'
import EditRequest from './components/Requests/EditRequest'
import { fetch_requests } from './actions'
import initialState from './reducers/initialState'

const ProgrammerTest = () => (
  <BrowserRouter>
    <Fragment>
      <NavBar />
      <Switch>
        <Route
          path="/requests"
          component={Requests}
          exact
        />
        <Route
          path="/wireframe"
          component={Wireframe}
          exact
        />
        <Route
          path="/edit/:id"
          component={EditRequest}
          exact
        />
        <Route component={Instructions} />
      </Switch>
    </Fragment>
  </BrowserRouter>
)

const store = createStore(reducers,initialState, applyMiddleware(reduxThunk))
store.dispatch(fetch_requests());

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <ProgrammerTest />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'))
