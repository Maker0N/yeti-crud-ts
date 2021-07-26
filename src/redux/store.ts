import { createStore, combineReducers } from 'redux'
import mainReducer from './mainReducer'
import authReducer from './authReducer'

const reducers = combineReducers({
  mainReducer,
  authReducer
})

export type ReducersType = ReturnType<typeof reducers>

const store = createStore(reducers)

export default store