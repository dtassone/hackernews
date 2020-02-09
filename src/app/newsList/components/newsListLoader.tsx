import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const NewsListLoader: React.FC<{}> = () => (
  <div className="news-list-loader">
    <CircularProgress />
  </div>
);
