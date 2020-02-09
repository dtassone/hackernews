import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(message.length > 0);
  }, [message]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
