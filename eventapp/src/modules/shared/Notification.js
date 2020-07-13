import React, { useContext, useEffect } from 'react';
import NotificationContext from '../../context/notification/notificationContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const notificationContext = useContext(NotificationContext);  
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    handleClick();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    notificationContext.clearNotifications();

    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    notificationContext.notifications.length && 
    notificationContext.notifications.map( notification => (
      <Snackbar key={notification.id} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.type}>
          { notification.msg }
        </Alert>
      </Snackbar>
    ))
  );
};

export default Notification;
