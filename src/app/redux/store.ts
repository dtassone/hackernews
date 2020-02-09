import { configureStore, getDefaultMiddleware, Store, Middleware } from '@reduxjs/toolkit';
import { rootReducer, AppState, AppActions } from './root.reducer';

export default function configureAppStore(): Store<AppState, AppActions> {
  const store = configureStore<AppState, AppActions, Middleware[]>({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })],
  });

  return store;
}
