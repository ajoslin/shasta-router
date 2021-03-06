import { routeActions, syncHistory, routeReducer } from 'react-router-redux'
import {
  browserHistory,
  hashHistory,
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect
} from 'react-router'

const moduleName = 'router'

const builtins = {
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect
}

const middleware = syncHistory(window.cordova ? hashHistory : browserHistory)
const getRouterState = (state) => state.get(moduleName).location

export default {
  ...builtins,
  history: browserHistory,
  reducers: {
    [moduleName]: routeReducer
  },
  actions: {
    [moduleName]: routeActions
  },
  middleware: middleware,
  hook: (store) => {
    middleware.listenForReplays(store, getRouterState)
    return store
  }
}
