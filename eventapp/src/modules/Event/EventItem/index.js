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
    maxWidth: props => props.isFlat ? 500 : 250,
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

const EventItem = (props) => {
  const classes = useStyles(props);

  const cardDetails = (
    <CardContent className={classes.content}>
          <IconButton color="default" aria-label="delete">
            <ShareIcon />
          </IconButton>
          <IconButton color="default" aria-label="delete">
            <FavoriteBorderIcon />
          </IconButton>
          <Chip
            label="Free"
            color="default"
            variant="outline"
            className={classes.priceDetail}/>
          <Typography gutterBottom className={classes.title} variant="p" component="h4">
            Mon, Jun 1, 2020 10:00 AM AST
          </Typography>
          <Typography component="h3">
            The best meat party
          </Typography>
        </CardContent>
  );

  const cardMedia = (
    <CardMedia
          component="img"
          alt="Party"
          height="140"
          image="https://media.timeout.com/images/105347841/630/472/image.jpg"
          title="Party"
        />
  );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Party"
          height="140"
          image="https://media.timeout.com/images/105347841/630/472/image.jpg"
          title="Party"
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
          variant="outline"
          className={classes.priceDetail}/>
        <Typography gutterBottom className={classes.title} variant="p" component="h4">
          Mon, Jun 1, 2020 10:00 AM AST
        </Typography>
        <Typography component="h3">
          The best meat party
        </Typography>
      </CardContent>
      {/* { cardDetails }
      { cardMedia } */}

    </Card>
  );
}

export default EventItem
