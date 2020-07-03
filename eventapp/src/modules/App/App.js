import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import DefaultLayout from '../shared/Layout/DefaultLayout';
import EventProvider from '../../context/event/EventProvider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { ProvideAuth } from '../../hooks/use-auth';

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
          </Suspense>
        </BrowserRouter>
      </EventProvider>
    </ProvideAuth>
  );
}

export default App;
