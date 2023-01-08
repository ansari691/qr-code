import { IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export const SnackAlert = ({
  snackData,
  setSnackData,
}: {
  snackData: {
    severity: 'info' | 'error' | 'warning' | 'success';
    message: string;
    duration?: number;
  } | null;
  setSnackData: (
    snackData: {
      severity: 'info' | 'error' | 'warning' | 'success';
      message: string;
      duration?: number;
    } | null
  ) => void;
}) => {
  //   const [open, setOpen] = useState(true);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackData(null);
  };
  const action = (
    <>
      {/* <Button color="secondary" size="small" onClick={() => setOpen(false)}>
            UNDO
          </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSnackData(null)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar
      open={Boolean(snackData)}
      // open={true}
      autoHideDuration={snackData?.duration ?? 3000}
      //@ts-ignore
      onClose={handleClose}
      message="Note archived"
      action={action}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert
        onClose={handleClose}
        severity={snackData?.severity}
        sx={{ width: '100%', maxWidth: 700 }}
      >
        {snackData?.message}
      </Alert>
    </Snackbar>
  );
};
