import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import bannerImage from '../../../assets/imgs/events.svg';
import EventItem from '../../Event/EventItem';


const useStyles = makeStyles((theme) => ({
  mainMessage: {
    marginTop: '60px'
  },
  banner: {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    height: theme.spacing(60)
  },
  subtitle: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  buttonLink: {
    textDecoration: 'None',
    color: '#fff',
    '&:hover': {
      textDecoration: 'None',
    }
  },
  detailsButton: {
    textAlign: 'center',
    marginTop: '20px'
  }
}));

const Home = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <br />
        <Grid container>
          <Grid item xs={12} sm={4} md={4} className={classes.mainMessage}>
            <Typography variant="h3" component="h3" gutterBottom>
              Connecting through
            </Typography>
            <Typography variant="h2" gutterBottom>
              Online events
            </Typography>
            <Link component={RouterLink} className={classes.buttonLink} to='/events'>
              <Fab variant="extended" color="primary">
                  Browse Events
              </Fab>
            </Link>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Paper className={classes.banner}>
            </Paper>
          </Grid>
          <Typography className={classes.subtitle} gutterBottom variant="h5" component="h5">
            Latest Events
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <EventItem />
            </Grid>
            <br/>
            <Grid item xs={12} sm={12} md={12} className={classes.detailsButton}>
              <Link component={RouterLink} className={classes.buttonLink} to='/events'>
                <Button variant="contained" color="default">
                  See more
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Home;
