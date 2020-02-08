import * as React from 'react';
import { NewsListContainer } from './newsList/newsList';
import AppHeader from './header';
import { PreviewStory } from './previewStory';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
            <CssBaseline />
			<AppHeader />
			<div className="layout">
				<NewsListContainer />
				<PreviewStory />
			</div>
		</ThemeProvider>
	);
};
