import React, { 
  Fragment,
  useEffect,
  useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EventListItem from '../../Event/EventListItem';
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuth } from '../../../hooks/use-auth';
import EventContext from '../../../context/event/eventContext';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    marginTop: 80
  },
  title: {
    float: 'left',
    color: '#404040',
    fontWeight: 'bold'
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 60
  },
  emptyIcon: {
    fontSize: '10ch'
  },
  message: {
    color: '#404040'
  },
  buttonLink: {
    textDecoration: 'None',
    '&:hover': {
      textDecoration: 'None',
    }
  }
});

const FavoriteList = (props) => {
  const auth = useAuth();
  const eventContext = useContext(EventContext);
  const { getFavoriteEvents, filteredEvents } = eventContext;
  const styles = useStyles();

  useEffect(() => {
    if (auth.user) {
      getFavoriteEvents();
    } else {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  const eventList = (
    filteredEvents && 
    filteredEvents.map( (event, index) => (
      <EventListItem key={index} event={event} id={event._id} />  
    ))
    // : <div className={styles.emptyList}>
    // <EventBusyOutlinedIcon
    //   color="primary" 
    //   className={styles.emptyIcon}/>
    // <Typography 
    //   component="h3" 
    //   variant="p"
    //   className={styles.message}>
    //   Currently you don't have any favorite events
    // </Typography>
    // <br/>
    // <Typography component="p" variant="p">
    //   <Link 
    //     component={RouterLink}
    //     to='/events'
    //     color="primary"
    //     className={styles.buttonLink}>
    //       Browse events here
    //     </Link>
    //   </Typography>
    // </div> 
  );

  return (
    <Fragment>
      <Container>
        <Grid 
          container 
          maxWidth="md" 
          className={styles.root}>
          <Grid item md={3}>
            <Typography 
              component="h3" 
              variant="h3"
              className={styles.title}>
              Likes
            </Typography>
          </Grid>
          <Grid 
            item 
            md={8}
            sm={6}
            xs={12}>
            {
              eventList
            }
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default FavoriteList
