import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const config = {
  key: 'container',
  storage,
  whitelist: ['Auth']
}
const persistedReducer = persistReducer(config, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk, logger))
export const pesistor = persistStore(store)
