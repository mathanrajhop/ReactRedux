import { combineReducers } from 'redux'

import StorageReducer from './storage'

export default combineReducers({
  storage: StorageReducer
})
