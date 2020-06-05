import React, { Fragment } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  loginLayout: {
    marginTop: '40px',
    textAlign: 'center'
  },
  h2Style: {
    margin: '10px 0px 10px 0px'
  },
  h4Style: {
    margin: '20px 0px 16px 0px'
  },
  formField: {
    width: props => props.formFieldSize,
  },
});

const Login = (props) => {
  const propstyles = {};
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  propstyles.formFieldSize = isSmallDevice ? 'auto' : '45ch';

  const classes = useStyles(propstyles);


  return (
    <Fragment>
      <Container maxWidth="sm">
        <Grid container className={classes.loginLayout}>
          <Grid xs={12} md={12}>
            <Typography  component="h3" variant="h3">
              E
            </Typography>
            <Typography className={classes.h2Style}  component="h2" variant="p">
              Log In
            </Typography>
            <Typography className={classes.h4Style} component="p" variant="p">
              Get started here
            </Typography>
            <form noValidate autoComplete="off">
              <Grid xs={12} sm={12}>
                <TextField
                  id="email"
                  name="Email"
                  label="Email address"
                  variant="outlined"
                  color="primary"
                  className={classes.formField}
                />
              </Grid>
              <br/>
              <Grid xs={12} sm={12}>
                <TextField
                  id="password"
                  name="Password"
                  label="Password"
                  variant="outlined"
                  color="primary"
                  className={classes.formField}
                />
              </Grid>
              <br/>
              <Grid xs={12} sm={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  className={classes.formField}>
                  Log In
                </Button>
              </Grid>
            </form>
            <br/>
            <Typography component="p" variant="p">
              <Link component={RouterLink}  to='/forgotpassword'>
                forgot password
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>      
  )
}

export default Login
