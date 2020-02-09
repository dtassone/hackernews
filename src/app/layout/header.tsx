import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  noPadding: {
    paddingLeft: 16,
  },
});

export const Header: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className="app-header">
      <Toolbar classes={{ root: classes.noPadding }}>
        <img src="./hk.png" className="hk-logo" />
        <Typography variant="h6">Hacker News Reader</Typography>
      </Toolbar>
    </AppBar>
  );
};
