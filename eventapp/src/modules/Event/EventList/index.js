import React, { Fragment, useContext, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EventListItem from '../../Event/EventListItem';
import EventSearchBar from '../../Event/EventSearchBar';
import { makeStyles } from '@material-ui/core/styles';
import EventFilter from '../../Event/EventFilter';
import EventContext from '../../../context/event/eventContext';
// import Button from '@material-ui/core/Button';
// import Pagination from '@material-ui/lab/Pagination';

// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles( (theme) => ({
  layout: {
    marginLeft: '0px'
  },
  actionPanel: {
    backgroundColor: 'lenear-gradient(180deg, #f2f2f2 0%, #FFF 35%)',
    height: '100%',
    paddingLeft: '15px !important'
  },
  navigation: {
    position: 'absolute',
    bottom: '15px',
  }
}));

const EventList = () => {
  const eventContext = useContext(EventContext);
  const { events, getEvents, paging } = eventContext;
  const [page, setPage] = React.useState(1);
  const [pageQuery, setQuery] = React.useState({});
  const classes = useStyles();
  
  useEffect(() => {
    getEvents(pageQuery);
    // eslint-disable-next-line
  }, [pageQuery]);

  // Not using pagination
  // const pageChange = (event, value) => {

  //   setQuery({ page: newPage });

  //   setPage(value);
  // };

  const eventList = (
    events.map( (event, index) => (
      <EventListItem key={index} event={event} id={event._id} />  
    ))
  );

  return (
    <Fragment>
      <CssBaseline />
      <Container className={classes.layout}>
        <Grid 
          container 
          maxwidth="lg"
          style={{ position: 'relative' }}
          spacing={8}>
          <Grid 
            item 
            md={2}
            sm={2}
            xs={12} 
            className={classes.actionPanel}>
            <EventFilter getEvents={getEvents} />
          </Grid>
          <Grid 
            item 
            md={8}
            sm={10}>
            <EventSearchBar />
            { eventList }       
            {/* {paging &&
              <div className={classes.navigation}>
              <Pagination 
                shape="rounded"
                color="primary"
                count={paging.total} 
                page={page} 
                onChange={pageChange} />
            </div>} */}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default EventList;
