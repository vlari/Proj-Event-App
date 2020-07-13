import React, { 
  Fragment,
  useEffect,
  useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import OrderContext from '../../../context/order/orderContext';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import { getShortDate } from '../../../utils/dateParser';
import { useAuth } from '../../../hooks/use-auth';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';

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

const TicketList = (props) => {
  const auth = useAuth();
  const styles = useStyles();
  const orderContext = useContext(OrderContext);
  const { getOrders, orders } = orderContext;

  useEffect(() => {
    if (auth.user) {
      getOrders();
    } else {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, []);


  const ticketList = (
    orders.map( (order, index) => (
      <Grid key={index} item xs={12} sm={12} md={12}>
        <Card className={styles.root}>
          <CardContent style={{ width: 'inherit' }}>
            <Typography
              component="p" 
              variant="h5"
              style={{ color: '#3F51B5' }}>
              { order.event.name }
            </Typography>
            <Typography 
              component="p">
              <AccessTimeRoundedIcon color="primary" />
              { getShortDate(order.event.date) }
            </Typography>
            <Typography 
              component="p">
              <LocationOnRoundedIcon color="primary" />
              { order.event.address }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  const renderEmptyList = (
    <div className={styles.emptyList}>
      <ReceiptIcon
        color="primary" 
        className={styles.emptyIcon}/>
      <Typography 
        component="h3" 
        variant="p"
        className={styles.message}>
        It seems you haven't placed any order
      </Typography>
      <br/>
      <Typography component="p" variant="p">
        <Link 
          component={RouterLink}
          to='/events'
          color="primary"
          className={styles.buttonLink}>
            Browse events here
        </Link>
      </Typography>
    </div>
  );

  return (
    <Fragment>
      <Container>
        <Grid container 
          maxWidth="md" 
          className={styles.root}>
          <Grid item md={3}>
            <Typography 
              component="h3" 
              variant="h3"
              className={styles.title}>
              Tickets
            </Typography>
          </Grid>
          <Grid item md={4}>
            { orders.length &&
              ticketList
            }
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default withRouter(TicketList);
