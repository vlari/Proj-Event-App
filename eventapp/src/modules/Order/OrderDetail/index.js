import React,{ 
  Fragment,
  useContext,
  useState,
  useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import OrderContext from '../../../context/order/orderContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { useAuth } from '../../../hooks/use-auth';
import PaymentIcon from '@material-ui/icons/Payment';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import NotificationContext from '../../../context/notification/notificationContext';

const useStyles = makeStyles({
  orderSummary: {
    backgroundColor: '#f2f2f2',
    padding: '15px',
    marginBottom: '8px'
  },
  summaryTitle: {
    color: '#404040'
  },
  summaryText: {
    color: '#4d4d4d'
  },
  qtySelect: {
    width: '80px'
  },
  paymentForm: {
    maxWidth: '800px'
  }
});

const OrderDetail = (props) => {
  // const auth = useAuth();
  const orderContext = useContext(OrderContext);
  const notificationContext = useContext(NotificationContext);
  const { onClose, open, event } = props;
  const initialState = {
    event: {
      name: event.name,
      organizer: event.organizer.name,
      date: new Date(event.date),
      address: event.location.fullAddress,
      ticket: event.ticket
    },
    quantity: 1,
    price: 0
  };

  const paymentState = {
    cardNumber: 'e.g. 809 654 654 879',
    expirationDate: 'e.g. 06/22',
    csc: 'e.g. 429',
    postal: 'e.g. 10001'
  };

  const [order, setOrder] = useState(initialState);
  const [payment, setPayment] = React.useState(paymentState);
  const styles = useStyles();

  const { cardNumber, expirationDate, csc, postal } = payment;
  const { setNotification } = notificationContext;
  const { placeOrder } = orderContext;

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const handleClose = () => {
    onClose();
  };

  const getOrderTotal = () => {
    let total = 0;

    const ticket = order.event.ticket;
    total += ticket.price * ticket.qty;

    return total;
  };

  const onDetailChange = (e) => {
    let newOrder = { ...order };

    const selectedTicket = event.ticket;
    selectedTicket.qty = e.target.value;

    newOrder.event.ticket.qty = selectedTicket.qty;

    setOrder({ ...newOrder });
  };

  const onPaymentChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    })
  };

  const ticketList = (
      <ListItem>
          <ListItemText 
            style={{ fontSize: '20px' }}
            primary={event.ticket.name}
            secondary={
              <Typography 
                component="p"
                variant="h5">
                  { `$${parseFloat(event.ticket.price)}` }
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <div className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Qty</InputLabel>
              <Select
                id={event.ticket.name}
                name={event.ticket.name}
                value={order.quantity}
                className={styles.qtySelect}
                onChange={onDetailChange}
                label="Qty"
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </div>
          </ListItemSecondaryAction>
      </ListItem>
  );

  const onSubmitOrder = (e) => {
    e.preventDefault();
    let isValid = true;

    for (const key in payment) {
      if (!payment[key].length) {
        isValid = false;
      }
    }

    if (isValid) {
      const orderSummary = { ...order };
      const selectedEvent = event.ticket;
      orderSummary.event.ticket = selectedEvent.name;
      orderSummary.quantity = parseInt(selectedEvent.qty, 10) || 1;
      orderSummary.price = parseFloat(selectedEvent.price);

      const orderDetail = { ...orderSummary };
      orderDetail.payment = { ...payment };
      
      setNotification('Your order has been placed!', 'success');

      placeOrder(orderDetail);
      props.history.push('/');
    } else {
      setNotification('Please fill all required fields', 'error');
    }


  };

  return (
    <Fragment>
      <Dialog 
        onClose={handleClose} 
        aria-labelledby="simple-dialog-title" 
        open={open}
        fullWidth={true}
        maxWidth="md">
        <DialogTitle id="simple-dialog-title">{ event.name }</DialogTitle>
        <Divider />
        <Card>
          <CardContent>
            <form 
              noValidate 
              onSubmit={onSubmitOrder}>
              <Grid container>
                <Grid 
                  item
                  xs={12} md={8}>
                    <List>
                      {parseInt(event.ticket.price, 10) !== 0
                        ? ticketList
                        : <Typography
                            component="p"
                            variant="h5"
                            className={styles.summaryText}>
                              { event.description }
                          </Typography>
                      }
                      <Divider />
                    </List>
                </Grid>
                <Grid
                  item
                  xs={12} md={4}
                  className={styles.orderSummary}>
                    <Typography 
                      component="p" 
                      className={styles.summaryTitle}>
                      Order Summary
                    </Typography>
                    <br/>
                    {
                      event.ticket
                      ? 
                        <Typography
                          component="p" 
                          className={styles.summaryText}>
                          Price
                          <span style={{ float: 'right' }}>
                            { `$${event.ticket.price}`}
                          </span>
                        </Typography>
                      : null
                    }
                    <br/>
                    <Divider variant="middle" />
                    <br/>
                    <Typography 
                      component="p" 
                      className={styles.summaryTitle}>
                      Total
                      <span style={{ float: 'right' }}>
                      { `$${getOrderTotal()}`}
                      </span>
                    </Typography>
                </Grid>
                <Grid
                  item
                  xs={12} md={12}>
                  <Typography component="h4">
                    <PaymentIcon />Credit or Debit Card
                  </Typography>
                  <Grid 
                    container
                    className={styles.paymentForm}
                    spacing={4}>
                    <Grid
                      item
                      xs={12} md={12}>
                        <TextField 
                          name="cardNumber"
                          value={cardNumber}
                          variant="outlined"
                          label="Card Number" 
                          style={{ width: '100%'}}
                          error={!cardNumber.length}
                          onChange={onPaymentChange}/>
                    </Grid>
                    <Grid
                      item
                      xs={12} md={4}>
                        <TextField 
                          name="expirationDate"
                          value={expirationDate}
                          variant="outlined"
                          label="Expiration Date"
                          error={!expirationDate.length}
                          onChange={onPaymentChange}/>
                    </Grid>
                    <Grid
                      item
                      xs={12} md={4}>
                      <TextField 
                          name="csc"
                          value={csc}
                          variant="outlined"
                          label="CSC"
                          error={!csc.length}
                          onChange={onPaymentChange}/>
                    </Grid>
                    <Grid
                      item
                      xs={12} md={4}>
                      <TextField 
                          name="postal"
                          value={postal}
                          variant="outlined"
                          label="Postal"
                          error={!postal.length}
                          onChange={onPaymentChange}/>
                    </Grid>
                  </Grid>
                  <br/>
                </Grid>
                <Grid
                  item
                  xs={12} md={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary">
                      Place Order
                    </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </Fragment>
  )
};

export default withRouter(OrderDetail);
