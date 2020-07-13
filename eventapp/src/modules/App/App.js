import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import DefaultLayout from '../shared/Layout/DefaultLayout';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Notification from '../shared/Notification';

import EventProvider from '../../context/event/EventProvider';
import { ProvideAuth } from '../../hooks/use-auth';
import NotificationProvider from '../../context/notification/NotificationProvider';
import OrderProvider from '../../context/order/OrderProvider';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#3F51B5',
  },
}));

function App() {
  const styles = useStyles();

  const loading = (
      <Backdrop className={styles.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
  );

  return (
    <ProvideAuth>
      <EventProvider>
        <NotificationProvider>
          <OrderProvider>
            <BrowserRouter>
              <Suspense fallback={ loading }>
                <Switch>
                  {
                    Object.values(routes).map( (route, index) => 
                      <Route 
                      component={DefaultLayout}
                      key={index}
                      render={(props) => <DefaultLayout {...props} /> }/>
                    )
                  }
                </Switch>
                <Notification />
              </Suspense>
            </BrowserRouter>
          </OrderProvider>
        </NotificationProvider>
      </EventProvider>
    </ProvideAuth>
  );
}

export default App;
