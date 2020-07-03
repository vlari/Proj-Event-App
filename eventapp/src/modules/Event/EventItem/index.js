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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="image"
          height="140"
          image={event.imageUrl}
          title={event.name}
        />
      </CardActionArea>
      <CardContent>
        <IconButton color="default" aria-label="delete">
          <ShareIcon />
        </IconButton>
        <IconButton color="default" aria-label="delete">
          <FavoriteBorderIcon />
        </IconButton>
        <Chip
          label="Free"
          color="default"
          variant="outlined"
          className={classes.priceDetail}/>
        <Typography className={classes.title} component="p">
          { event.date }
        </Typography>
        <Typography component="h3">
          { event.name }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventItem
