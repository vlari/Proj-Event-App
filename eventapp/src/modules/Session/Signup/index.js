import React, { 
  Fragment,
  useState,
  useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth } from '../../../hooks/use-auth';

import { MuiPickersUtilsProvider, DatePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
  signUpLayout: {
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

const SignUp = (props) => {
  const propstyles = {};
  const theme = useTheme();
  const initialState = {
    name: '',
    dob: new Date(),
    email: '',
    password: ''
  };
  const validatorState = {
    name: {
      validate(name) { 
        return name.length > 0
      },
      message: ''
    },
    dob: {
      validate(dob) { 
        return dob.length > 0
      },
      message: ''
    },
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
  const [signUpUser, setSignUpUser] = useState(initialState);
  const [validator, setValidator] = useState(validatorState);
  const regexEmail = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/;
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));
  propstyles.formFieldSize = isSmallDevice ? 'auto' : '45ch';
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      props.history.push('/');
    }

  }, [auth.user]);

  const { name, dob, email, password } = signUpUser;
  
  const classes = useStyles(propstyles);

  const onInputChange = (e) => {
    setSignUpUser({
      ...signUpUser,
      [e.target.name]: e.target.value
    })
  };
  
  const onSignUp = (e) => {
    e.preventDefault();
    const inputValidator = { ...validator };

    inputValidator.email.message = inputValidator.email.validate(email) ? '' : 'Please enter a valid email';
    inputValidator.password.message = inputValidator.password.validate(password) ? '' : 'Please enter a valid password';

    setValidator({ ...inputValidator });
    const isValid = !inputValidator.email.message.length && !inputValidator.password.message.length 

    if (isValid) {
      auth.signUp({
        name,
        dob,
        email,
        password
      });
      
    }
  };

  return (
    <Fragment>
      <Container maxWidth="sm">
        <Grid container className={classes.signUpLayout}>
          <Grid xs={12} md={12}>
            <Typography  component="h3" variant="h3">
              E
            </Typography>
            <Typography className={classes.title}  component="h2" variant="p">
              Sign Up
            </Typography>
            <Typography className={classes.subtitle} component="p" variant="p">
              Get started here
            </Typography>
            <form 
              onSubmit={onSignUp}
              noValidate 
              autoComplete="off">
              <Grid xs={12} sm={12}>
                <TextField
                  id="name"
                  error={validator.name.message.length > 0}
                  helperText={validator.name.message}
                  value={name}
                  name="name"
                  label="Name"
                  variant="outlined"
                  color="primary"
                  className={classes.formField}
                  onChange={onInputChange}
                />
              </Grid>
              <br/>
              <Grid xs={12} sm={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  name="dob"
                  disableToolbar
                  fullWidth="true"
                  variant="inline"
                  label="Date of Birth"
                  value={dob}
                  inputVariant="outlined"
                  className={classes.formField}
                  onChange={onInputChange}
                />
              </MuiPickersUtilsProvider>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                      error={validator.dob.message.length > 0}
                      helperText={validator.dob.message}
                      value={dob}
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date of Birth"
                      onChange={onInputChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />    
                </MuiPickersUtilsProvider> */}
              </Grid>
              <br/>
              <Grid xs={12} sm={12}>
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
              <Grid xs={12} sm={12}>
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
              <Grid xs={12} sm={12}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary"
                  className={classes.formField}>
                  Sign Up
                </Button>
              </Grid>
            </form>
            <br/>
            <Typography component="p" variant="p">
              <Link component={RouterLink}  to='/signin'>
                already have an account?
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Fragment>      
  )
}

export default SignUp;
