import React, 
  { Fragment,
    useState,
    useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import EventContext from '../../../context/event/eventContext';

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
  const eventContext = useContext(EventContext);
  const [text, setText] = useState('');
  const classes = useStyles();

  const { filter, getEvents } = eventContext;

  const clearFilter = () => {
    if (filter.hasOwnPropery('filter')) {
      delete filter.filter;
      getEvents(filter);
    }
  };

  const onTextChange = (e) => {
    if (e.target.value) {
      setText(e.target.value);
    } else {
      clearFilter();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      filter.filter = text
      getEvents(filter);
    }
  };

  return (
    <Fragment>
      <Grid container maxwidth="sm">
        <Grid item xs={12} sm={12} md={6}>
          <form 
            onSubmit={onSubmit}
            className={classes.root}>
              <InputBase
                className={classes.textField}
                value={text}
                inputProps={{ 'aria-label': 'naked' }}
                onChange={onTextChange}
              />
              <Button 
                type="submit"
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
