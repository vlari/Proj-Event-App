import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    height: 140,
    margin: '40px 0px 20px 0px;'
  },
  title: {
    color: '#3F51B5'
  },
  priceDetail: {
    float: 'left',
    marginTop: '10px'
  },
  content: {
    flex: '1 0 auto',
  },
  cardMedia: {
    width: 200
  },
  details: {
    width: 'inherit'
  },
  cardAction: {
    float: 'right',
    marginTop: '20px'
  }
});

const EventItem = (props) => {
  const classes = useStyles();
  //const seeDetail = () => props.history.push(`/event/${id}`);
  const { event, id } = props;
  const eventDate = new Date(Date.parse(event.date));


  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Card className={classes.root}>
          <CardActionArea 
            className={classes.cardMedia}>
            <Link component={RouterLink} to={`/events/${id}`}>
              <CardMedia
                component="img"
                alt="Party"
                height="140"
                image={event.imageUrl}
                title="Party"
              />
            </Link>
          </CardActionArea>
          <CardContent className={classes.details}>
            <Typography className={classes.title} component="p">
              { eventDate.toString() }
            </Typography>
            <Typography component="h3">
              { event.name }
            </Typography>
            <Chip
              label={ event.tickets.length ? 'Paid' : 'Free' }
              color="default"
              variant="outlined"
              className={classes.priceDetail}/>
            <span className={classes.cardAction}>
              <IconButton color="default" aria-label="delete">
                <ShareIcon />
              </IconButton>
              <IconButton color="default" aria-label="delete">
                <FavoriteBorderIcon />
              </IconButton>
            </span>
          </CardContent>
        </Card>
       </Grid>
     </Grid>
  );
}

export default EventItem
