import React, { 
  Fragment,
  useState,
  useEffect,
  useContext } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth } from '../../../hooks/use-auth';
import { withRouter } from 'react-router-dom';
import NotificationContext from '../../../context/notification/notificationContext';

const useStyles = makeStyles({
  signInLayout: {
    marginTop: '40px',
    textAlign: 'center'
  },
  title: {
    margin: '10px 0px 10px 0px'
  },
  subtitle: {
    margin: '20px 0px 16px 0px'
  },
  formField: {
    width: props => props.formFieldSize,
  },
});

const SignIn = (props) => {
  const propstyles = {};
  const theme = useTheme();
  const initialState = {
    email: '',
    password: ''
  };
  const validatorState = {
    email: {
      validate(emailValue) { 
        return regexEmail.test(emailValue)
      },
      message: ''
    },
    password: {
      validate(password) { 
        return password.length >= 8;
      },
      message: ''
    }
  };
  const [signInUser, setSigninUser] = useState(initialState);
  const [validator, setValidator] = useState(validatorState);
  const notificationContext = useContext(NotificationContext)
  const regexEmail = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  propstyles.formFieldSize = isSmallDevice ? 'auto' : '45ch';
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      props.history.push('/');
    }

  }, [auth.user]);

  const { email, password } = signInUser;
  
  const classes = useStyles(propstyles);

  const onInputChange = (e) => {
    setSigninUser({
      ...signInUser,
      [e.target.name]: e.target.value
    })
  };
  
  const onSignIn = (e) => {
    e.preventDefault();
    const inputValidator = { ...validator };

    inputValidator.email.message = inputValidator.email.validate(email) ? '' : 'Please enter a valid email';
    inputValidator.password.message = inputValidator.password.validate(password) ? '' : 'Please enter a valid password';

    setValidator({ ...inputValidator });
    const isValid = !inputValidator.email.message.length && !inputValidator.password.message.length 

    if (isValid) {
      auth.signIn({
        email,
        password
      });

        props.history.push('/');
      }
  };

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Grid container className={classes.signInLayout}>
          <Grid item xs={12} md={12}>
            <Typography  component="p" variant="h3">
              E
            </Typography>
            <Typography className={classes.title}  component="p">
              Log In
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Get started here
            </Typography>
            <form 
              onSubmit={onSignIn}
              noValidate 
              autoComplete="off">
              <Grid item xs={12} sm={12}>
                <TextField
                  id="email"
                  error={validator.email.message.length > 0}
                  helperText={validator.email.message}
                  value={email}
                  name="email"
                  label="Email address"
                  variant="outlined"
                  color="primary"
                  className={classes.formField}
                  onChange={onInputChange}
                />
              </Grid>
              <br/>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password"
                  error={validator.password.message.length > 0}
                  helperText={validator.password.message}
                  value={password}
                  name="password"
                  label="Password"
                  variant="outlined"
                  color="primary"
                  className={classes.formField}
                  onChange={onInputChange}
                />
              </Grid>
              <br/>
              <Grid 
                item 
                xs={12}
                sm={12}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary"
                  className={classes.formField}>
                  Sign In
                </Button>
              </Grid>
            </form>
            <br/>
            <Typography component="p">
              <Link component={RouterLink}  to='/forgotpassword'>
                forgot password
              </Link>
            </Typography>
            <Divider variant="middle" />
            <Typography component="p">
              <Link component={RouterLink}  to='/signup'>
                don't have an account?
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>      
  )
}

export default withRouter(SignIn);
