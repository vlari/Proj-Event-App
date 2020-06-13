import React, { Fragment, Suspense } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../shared/Layout/Navbar';
import Footer from '../../shared/Layout/Footer';
import Container from '@material-ui/core/Container';
import { Switch, Route } from 'react-router-dom';
import routes from '../../../routes';

const DefaultLayout = (props) => {
  return (
   <Fragment>
     <Navbar />
     <Container 
      maxWidth="lg"
      style={{ margin: '0px' }}>
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

     </Container>
     {/* <Footer /> */}
   </Fragment>
  )
}

export default DefaultLayout;
