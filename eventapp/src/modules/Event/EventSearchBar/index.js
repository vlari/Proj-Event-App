import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({
  root: {
    width: 'inherit',
    display: 'flex'
  },
  textField: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#e6e6e6',
    fontSize: '30px',
    borderRadius: '4px',
    padding: '12px',
    color: '#404040',
    flex: 1
  },
  searchButton: {
    marginTop: 20
  }
});

const EventSearchBar = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container maxwidth="sm">
        <Grid item xs={12} sm={12} md={6}>
          <form className={classes.root}>
              <InputBase
                className={classes.textField}
                defaultValue=""
                inputProps={{ 'aria-label': 'naked' }}
              />
              <Button 
                variant="contained"
                color="primary"
                className={classes.searchButton}>
                Search
              </Button>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default EventSearchBar
