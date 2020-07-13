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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuth } from '../../../hooks/use-auth';
import { withRouter } from 'react-router-dom';
import EventContext from '../../../context/event/eventContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  title: {
    color: '#3F51B5'
  },
  priceDetail: {
    float: 'right',
    marginTop: '10px'
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const EventItem = ({ event, id }) => {
  const auth = useAuth();
  const eventContext = useContext(EventContext);
  const [isFavorite, setFavorite] = useState(event.liked);
  const styles = useStyles();

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
    <Card className={styles.root}>
      <CardActionArea>
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
      <CardContent>
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
        <Chip
          label={ event.ticket ? 'Paid' : 'Free' }
          color="default"
          variant="outlined"
          className={styles.priceDetail}/>
        <Typography className={styles.title} component="p">
          { event.date }
        </Typography>
        <Typography component="h3">
          { event.name }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withRouter(EventItem);
