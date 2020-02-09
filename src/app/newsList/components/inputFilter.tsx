import React, { useState, useCallback, useMemo, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    zIndex: 100,
    flex: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  searchContainer: {
    display: 'flex',
  },
}));

export interface InputFilterProps {
  onChange: (value: string) => void;
}
export const InputFilter: React.FC<InputFilterProps> = ({ onChange }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const debouncedOnChange = useMemo(() => debounce(onChange, 200), [onChange]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      debouncedOnChange(e.target.value);
    },
    [debouncedOnChange],
  );

  return (
    <div className={classes.searchContainer}>
      <Paper component="form" className={classes.root}>
        <InputBase className={classes.input} placeholder="Filter Stories" value={inputValue} inputProps={{ 'aria-label': 'search stories' }} onChange={handleInputChange} />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
