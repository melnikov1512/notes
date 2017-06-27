import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'

const logger = createLogger();

export default function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
  return store
}