import './styles/index.css';
import './styles/newsList.less';

import * as React from 'react';
import { NewsListContainer } from './newsList/components/newsList';
import AppHeader from './header';
import { PreviewStory } from './previewPanel/components/previewStory';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './styles/theme';
import configureAppStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureAppStore();

export const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AppHeader />
				<div className="layout">
					<NewsListContainer />
					<PreviewStory />
				</div>
			</ThemeProvider>
		</Provider>
	);
};
