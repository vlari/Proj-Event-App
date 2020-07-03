import React, 
{ Fragment,
  useState,
  useEffect,
  useContext } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import { getUtcDate, getShortDate } from '../../../utils/dateParser';
import EventContext from '../../../context/event/eventContext';
import EventMapLocation from '../EventMapLocation';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import OrderDetail from '../../Order/OrderDetail';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  layout: {
    marginTop: '5em'
  },
  mainTitle: {
    padding: '25px'
  },
  subTitle: {
    fontWeight: 'bold'
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
  const [open, setOpen] = useState(false);
  const { event, getEvent } = eventContext;
  let { id } = useParams();

  const styles = useStyles();

  useEffect(() => {
    getEvent(id);
    // eslint-disable-next-line
  }, []);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

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

  const preventDefault = (event) => event.preventDefault();

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
                      alt="image"
                      height="300"
                      image={event.imageUrl}
                      title={event.name}
                    />
                  </Grid>
                  <Grid 
                    item 
                    md={2}
                    className={styles.mainTitle}>
                      <Typography 
                        component="p" 
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
                      <Typography 
                        component="p" 
                        >
                        { `by ${event.organizer.name}` }
                      </Typography>
                      <Typography 
                        component="p">
                        <Link href="#" onClick={preventDefault}>
                          { event.organizer.website && event.organizer.website }
                        </Link>
                      </Typography>
                      <br/>
                      <Chip
                        label={ event.tickets.length ? 'Paid' : 'Free' }
                        color="default"
                        variant="outlined"
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
                        className={styles.btnTickets}
                        onClick={openDialog}>
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
                          component="p" 
                          className={styles.subTitle}
                          >
                            Date And Time
                        </Typography>
                        <Typography 
                          component="p" 
                          >
                            { getUtcDate(event.date) }
                        </Typography>
                        <br/>
                        <br/>
                        <Typography 
                          component="p"
                          className={styles.subTitle}
                          >
                            Location
                        </Typography>
                        <Typography 
                          component="p" 
                          >
                            { event.location.fullAddress }
                        </Typography>
                    </Grid>
                    <Grid 
                      item
                      xs={12}
                      md={12}
                      className={styles.paddingCenter}>
                        <EventMapLocation 
                          lng={event.location.coordinates[0]}
                          lat={event.location.coordinates[1]}/>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={styles.paddingCenter}>
                        <Typography 
                          component="p" 
                          className={styles.subTitle}>
                            Tags
                        </Typography>
                        <br/>
                        { getTags }
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <OrderDetail 
                open={open} 
                onClose={handleClose} 
                event={event}
                />
            </Grid>
          }
        </Grid>
      </Container>
    </Fragment>
  )
};

export default EventDetail;
