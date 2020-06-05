import React, { Fragment } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  layout: {
    marginTop: '50px',
    textAlign: 'center'
  },
  emailIcon: {
    fontSize: '50px'
  },
  descriptionText: {
    color: '#666666'
  }
});

const ForgotPassword = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Grid container className={classes.layout}>
          <Grid item xs={12} sm={12}>
            <Typography component="h3" variant="h3">
              <EmailIcon 
                color="primary" 
                className={classes.emailIcon} />
            </Typography>
            <br/>
            <Typography 
              gutterbutton 
              component="p" 
              variant="h5">
              Check you email
            </Typography>
            <br/>
            <Typography 
              gutterbutton 
              component="p" 
              variant="p" 
              className={classes.descriptionText}>
              We sent an email to testemail@gmail.com with instructions to reset your password.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>  
  )
}

export default ForgotPassword
