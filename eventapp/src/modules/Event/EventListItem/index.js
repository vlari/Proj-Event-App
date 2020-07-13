import React, {
  useState,
  useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuth } from '../../../hooks/use-auth';
import { withRouter } from 'react-router-dom';
import EventContext from '../../../context/event/eventContext';

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

const EventListItem = (props) => {
  const auth = useAuth();
  const eventContext = useContext(EventContext);
  const styles = useStyles();
  const { event, id } = props;
  const [isFavorite, setFavorite] = useState(event.liked);
  const eventDate = new Date(Date.parse(event.date));

  const onAddEvent = () => {
    if (auth.user) {
      event.liked = !isFavorite;

      const result = !isFavorite 
      ? eventContext.addEvent(event._id)
      : eventContext.deleteEvent(event._id);

      setFavorite(!isFavorite);
    } else {
      props.history.push('/');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Card className={styles.root}>
          <CardActionArea 
            className={styles.cardMedia}>
            <Link component={RouterLink} to={`/events/${id}`}>
              <CardMedia
                component="img"
                alt={event.name}
                height="140"
                image={event.imageUrl}
                title={event.name}
              />
            </Link>
          </CardActionArea>
          <CardContent className={styles.details}>
            <Typography className={styles.title} component="p">
              { eventDate.toString() }
            </Typography>
            <Typography component="h3">
              { event.name }
            </Typography>
            <Chip
              label={ event.ticket ? 'Paid' : 'Free' }
              color="default"
              variant="outlined"
              className={styles.priceDetail}/>
            <span className={styles.cardAction}>
              <IconButton 
                color={isFavorite ? 'secondary' : 'default'} 
                aria-label="delete"
                onClick={onAddEvent}>
                {
                  isFavorite 
                  ? <FavoriteIcon />
                  : <FavoriteBorderIcon />
                }
              </IconButton>
            </span>
          </CardContent>
        </Card>
       </Grid>
     </Grid>
  );
}

export default withRouter(EventListItem);
