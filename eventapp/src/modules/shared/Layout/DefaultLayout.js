import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../shared/Layout/Navbar';
import Footer from '../../shared/Layout/Footer';
import { Switch, Route } from 'react-router-dom';
import routes from '../../../routes';

const DefaultLayout = (props) => {
  return (
   <Fragment>
     <Navbar />
      <Suspense>
        <Switch>
          {
            routes.map( (route, index) => {
              return <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                render={ (props) => <route.component {...props} /> }
              />
            })
          }
        </Switch>
      </Suspense>
     {/* <Footer /> */}
   </Fragment>
  )
}

export default DefaultLayout;
