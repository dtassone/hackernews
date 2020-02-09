import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//     appHeader: {
//      paddingRight:'15px'
//     },
//   }));

export default function Header() {
	return (
		<AppBar position="static" className="app-header">
			<Toolbar>
				<img src="./hk.png" className="hk-logo" />
				<Typography variant="h6">Hacker News Reader</Typography>
			</Toolbar>
		</AppBar>
	);
}
