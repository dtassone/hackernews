import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers/root.reducer';

export default function configureAppStore() {
	const store = configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware()
	});

	return store;
}
