import React, { Fragment, useContext, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EventListItem from '../../Event/EventListItem';
import EventSearchBar from '../../Event/EventSearchBar';
import { makeStyles } from '@material-ui/core/styles';
import EventFilter from '../../Event/EventFilter';
import EventContext from '../../../context/event/eventContext';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles( (theme) => ({
  layout: {
  },
  actionPanel: {
    backgroundColor: '#f2f2f2',
    height: '900px',
    paddingLeft: '15px !important'
  },
  pagination: {}
}));

const EventList = () => {
  const eventContext = useContext(EventContext);
  const { events, getEvents } = eventContext;
  const classes = useStyles();

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  const eventList = (
    events.map( (event, index) => (
      <EventListItem key={index} event={event} />  
    ))
  );

  return (
    <Fragment>
      <CssBaseline />
      <Grid 
        container 
        maxwidth="lg"
        className={classes.layout}
        spacing={8}>
        <Grid item md={2} className={classes.actionPanel}>
          <EventFilter getEvents={getEvents} />
        </Grid>
        <Grid item md={8}>
          <EventSearchBar />
          { eventList }       
        </Grid>
      </Grid>
      <div className={classes.pagination}>
        <Grid container>
          <Grid item md={6}>
            <Button color="primary">
              <ArrowBackIosIcon />
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button color="primary">
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
    </div>
    </Fragment>
  )
}

export default EventList;
