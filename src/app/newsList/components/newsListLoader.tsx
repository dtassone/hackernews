import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const NewsListLoader = ()=> (
    <div className="news-list-loader">
        <CircularProgress />
    </div>
);