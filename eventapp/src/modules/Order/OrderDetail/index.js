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
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
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
      tickets: []
    },
    quantity: 0,
    price: 0
  };

  // User added in middleware 
  // when order placed.

  const [order, setOrder] = useState(initialState);
  const styles = useStyles();

  const handleClose = () => {
    onClose();
  };

  const getOrderTotal = () => {
    let total = 0;

    if (order.event.tickets.length) {
      order.event.tickets.forEach(t => {
        total += t.price * t.qty;
      });
    }

    return total;
  };

  const onDetailChange = (e) => {
    let newOrder = { ...order };
    let tickets = newOrder.event.tickets; 

    const selectedTicket = event.tickets.find(t => e.target.name === t.name);
    selectedTicket.qty = e.target.value;

    const queryTicket = tickets.find(t => t.name === selectedTicket.name);
    if (e.target.value === 0) {

      const newTickets = newOrder.event.tickets.map(t => t.name !== selectedTicket.name);
      newOrder.event.tickets = newTickets;

    } else if (!tickets || !queryTicket) {
      newOrder.event.tickets.push(selectedTicket);
    } 

    setOrder({ ...newOrder });
  }

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
                <MenuItem value={0}>0</MenuItem>
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
        fullWidth="lg"
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
                    {event.tickets.length && ticketList}
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
                    order.event.tickets &&
                      order.event.tickets.map( (t, index) => (
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
                  }
                  <Typography
                    component="p" 
                    variant="p"
                    className={styles.summaryText}>
                    Taxes
                    <span style={{ float: 'right' }}>
                      { `$2` }
                    </span>
                  </Typography>
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
                  <Button
                      variant="contained"
                      color="primary">
                      Checkout
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
