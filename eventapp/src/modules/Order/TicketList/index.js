import React, { 
  Fragment,
  useEffect,
  useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EventListItem from '../../Event/EventListItem';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import OrderContext from '../../../context/order/orderContext';

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

const TicketList = () => {
  const styles = useStyles();
  const orderContext = useContext(OrderContext);

  const { orders } = orderContext;

  const ticketList = (
    <Grid item xs={12} sm={8} md={8}> 
      <EventListItem />
    </Grid>
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
      <Grid container maxWidth="md" className={styles.root}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography 
            component="h3" 
            variant="h3"
            className={styles.title}>
            Tickets
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* ticket list here */}
          
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default TicketList;
