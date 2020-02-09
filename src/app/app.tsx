import './styles/';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles/theme';
import configureAppStore from './redux/store';
import { Provider } from 'react-redux';

import { Layout } from './layout/layout';

const store = configureAppStore();

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </Provider>
  );
};
