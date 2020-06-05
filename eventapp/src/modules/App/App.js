import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import DefaultLayout from '../shared/Layout/DefaultLayout';

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
  );
}

export default App;
