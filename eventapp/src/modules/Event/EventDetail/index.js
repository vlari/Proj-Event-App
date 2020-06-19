import React, 
{ Fragment, 
  useEffect,
  useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import { getUtcDate, getShortDate } from '../../../utils/dateParser';
import EventContext from '../../../context/event/eventContext';

const useStyles = makeStyles({
  layout: {
    marginTop: '5em'
  },
  mainTitle: {
    padding: '25px'
  },
  middleDate: {
    color: '#4d4d4d'
  },
  priceDetail: {
    
  },
  btnTickets: {
    float: 'left'
  },
  btnUserAction: {
    float: 'right'
  },
  paddingCenter: {
    padding: '15px'
  },
  tag: {
    marginRight: '10px'
  }
});

const EventDetail = () => {
  const eventContext = useContext(EventContext);
  const { event, getEvent } = eventContext;
  let { id } = useParams();

  const styles = useStyles();

  useEffect(() => {
    getEvent(id);
    // eslint-disable-next-line
  }, []);

  const getTags = (
    event && event.tags.map( (tag, index) => (
      <Chip 
        variant="outlined"
        color="primary"
        label={tag}
        key={index}
        className={styles.tag}/>
    ))
  );

  console.log('event', event);

  return (
    <Fragment>
      <Container 
        maxWidth="md"
        className={styles.layout}>
        <Grid container>
          {
            event && 
            <Grid item xs={12} sm={12} md={12}>
              <Card>
                <Grid container>
                  <Grid item md={8}>
                    <CardMedia
                      component="img"
                      alt="Party"
                      height="300"
                      image="https://media.timeout.com/images/105347841/630/472/image.jpg"
                      title="Party"
                    />
                  </Grid>
                  <Grid 
                    item 
                    md={2}
                    className={styles.mainTitle}>
                      <Typography 
                        component="h4" 
                        variant="p"
                        className={styles.titleDate}>
                        { getShortDate(event.date) }
                      </Typography>
                      <br/>
                      <Typography 
                        component="h4" 
                        variant="h4"
                        style={{ color: '#333333' }}>
                        { event.name }
                      </Typography>
                      <br/>
                      <Typography component="p" variant="p">
                        { `by ${event.organizer.name}` }
                      </Typography>
                      <br/>
                      <Chip
                        label={ event.tickets.length ? 'Paid' : 'Free' }
                        color="default"
                        variant="outline"
                        className={styles.priceDetail}/>
                  </Grid>
                </Grid>
                <Divider />
                <CardContent>
                  <Grid container>
                    <Grid 
                      item
                      xs={12} md={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={styles.btnTickets}>
                          { event.tickets.length ? 'Tickets' : 'Register' }
                      </Button>
                      <span className={styles.btnUserAction}>
                        <IconButton color="default" aria-label="delete">
                          <FavoriteBorderIcon />
                        </IconButton>
                      </span>
                    </Grid>
                    <Divider />
                    <Grid 
                      item
                      xs={12}
                      md={8}
                      className={styles.paddingCenter}>
                        { event.description}
                    </Grid>
                    <Grid 
                      item
                      xs={12}
                      md={2}
                      className={styles.paddingCenter}>
                        <Typography 
                          component="h4" 
                          variant="p"
                          >
                            Date And Time
                        </Typography>
                        <Typography 
                          component="p" 
                          variant="p"
                          >
                            { getUtcDate(event.date) }
                        </Typography>
                        <br/>
                        <br/>
                        <Typography 
                          component="h4" 
                          variant="p"
                          >
                            Location
                        </Typography>
                        <Typography 
                          component="p" 
                          variant="p"
                          >
                            { event.location.fullAddress }
                        </Typography>
                    </Grid>
                    <Grid 
                      item
                      xs={12}
                      md={12}
                      className={styles.paddingCenter}>
                        Map here
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={styles.paddingCenter}>
                        <Typography 
                          component="h4" 
                          variant="p"
                          className={styles.titleDate}>
                            Tags
                        </Typography>
                        <br/>
                        { getTags }
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          }
        </Grid>
      </Container>
    </Fragment>
  )
};

export default EventDetail;
