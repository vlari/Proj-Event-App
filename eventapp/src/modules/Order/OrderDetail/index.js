import React,{ 
  Fragment,
  useContext,
  useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import EventContext from '../../../context/event/eventContext';
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
  }
});

const OrderDetail = (props) => {
  const auth = useAuth();
  const eventContext = useContext(EventContext);
  const { onClose, open, event } = props;
  const initialState = {
    event: {
      name: event.name,
      organizer: event.organizer,
      date: event.date,
      address: event.location.fullAddress,
      tickets: event.tickets
    },
    quantity: 0,
    price: 0
  };

  const paymentState = {
    cardNumber: '',
    expirationDate: '',
    csc: '',
    postal: ''
  };

  const [order, setOrder] = useState(initialState);
  const [payment, setPayment] = React.useState(paymentState);
  const [expanded, setExpanded] = React.useState('panel1');
  const styles = useStyles();

  const { cardNumber, expirationDate, csc, postal } = payment;

  const handleClose = () => {
    onClose();
  };

  const getOrderTotal = () => {
    let total = 0;

    if (order.event.tickets.length) {
      order.event.tickets.forEach(t => {
        total += (t.price * t.qty);
      });
    }

    return total;
  };

  const onDetailChange = (e) => {
    let newOrder = { ...order };

    const selectedTicket = event.tickets.find(t => e.target.name === t.name);
    selectedTicket.qty = e.target.value;

    newOrder.event.tickets.forEach(t => {
      if (t.name === e.target.name) {
        t.qty = selectedTicket.qty
      }
    });

    setOrder({ ...newOrder });
  };

  const onPaymentChange = () => {

  };

  const ticketList = (
    event.tickets.map( (ticket, index) => (
      <ListItem key={index}>
          <ListItemText 
            style={{ fontSize: '20px' }}
            primary={ticket.name}
            secondary={
              <Typography 
                component="p"
                variant="p">
                  { `$${parseFloat(ticket.price)}` }
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <div className={styles.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Qty</InputLabel>
              <Select
                id={ticket.name}
                name={ticket.name}
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
    ))
  );

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
            <Grid container>
              <Grid 
                item
                xs={12} md={8}>
                  <List>
                    {event.tickets.length 
                      ? ticketList
                      : <Typography
                          component="p"
                          variant="p"
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
                    component="h4" 
                    variant="p"
                    className={styles.summaryTitle}>
                    Order Summary
                  </Typography>
                  <br/>
                  {
                    order.event.tickets.length
                    ? order.event.tickets.map( (t, index) => (
                        <Typography
                          key={index}
                          component="p" 
                          variant="p"
                          className={styles.summaryText}>
                          Price
                          <span style={{ float: 'right' }}>
                            { `$${t.price}`}
                          </span>
                        </Typography>
                      ))
                    : null
                  }
                  <br/>
                  <Divider variant="middle" />
                  <br/>
                  <Typography 
                    component="h5" 
                    variant="p"
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
                <Grid container>
                  <Grid
                    item
                    xs={12} md={8}>
                      <TextField 
                        name="cardNumber"
                        value={cardNumber}
                        label="Card Number" 
                        style={{ width: '100%'}}
                        onChange={onPaymentChange}/>
                  </Grid>
                  <Grid
                    item
                    xs={12} md={12}>
                      <TextField 
                        name="expirationDate"
                        value={expirationDate}
                        label="Expiration Date" 
                        onChange={onPaymentChange}/>
                      <TextField 
                        name="csc"
                        value={csc}
                        label="CSC" 
                        onChange={onPaymentChange}/>
                      <TextField 
                        name="postal"
                        value={postal}
                        label="Postal" 
                        onChange={onPaymentChange}/>
                  </Grid>
                </Grid>
                <br/>
              </Grid>
              <Grid
                item
                xs={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary">
                    Place Order
                  </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Dialog>
    </Fragment>
  )
};

export default OrderDetail;
