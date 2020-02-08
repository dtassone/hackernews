import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from '../reducers'

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
  })
  
  return store
}