import React, { 
    Fragment, 
    useContext, 
    useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles( (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  btnField: {
    backgoundColor: '#e8902e'
  },
  selectField: {
    left: '30px'
  },
  actionTitle: {
    color: '#4d4d4d'
  }
}));

const EventFilter = ({ getEvents }) => {
  const classes = useStyles(); 

  const dateState = {
    date: {
      anyDate: 'outlined',
      today: '',
      tomorrow: ''
    },
    value: 'anyDate'
  };

  const priceState = {
    price: {
      anyPrice: 'outlined',
      free: '',
      paid: ''
    },
    value: 'anyPrice'
  };

  const [dateTemplate, setDateTemplate] = useState(dateState);
  const [priceTemplate, setPrice] = useState(priceState);

  const getDateValue = (name) => {
    let dateValue;
      const currentDate = new Date();
      switch (name) {
        case 'anyDate':
          dateValue = '';
          break;
        case 'today':
          dateValue = new Date();
          break;
        case 'tomorrow':
          const currentDate = new Date();
          const tomorrow = currentDate.setDate(new Date().getDate() + 1);
          dateValue = new Date(tomorrow);
          break;
        default:
          dateValue = ''
          break;
      }

    return dateValue;
  };

  const onDateChange = (name) => {
    let updatedModel = {};
    updatedModel = { ...dateTemplate };

    for (const key in updatedModel.date) {
      updatedModel.date[key] = '';
    }

    updatedModel.date[name] = 'outlined';

    updatedModel.value = getDateValue(name);

    console.log(updatedModel);

    setDateTemplate({
      ...updatedModel
    });
  }
  
  const onPriceChange = (name) => {
    let updatedModel = {};
    updatedModel = { ...priceTemplate };

    for (const key in updatedModel.price) {
      updatedModel.price[key] = '';
    }

    updatedModel.price[name] = 'outlined';

    updatedModel.value = name;
    
    setPrice({
      ...updatedModel
    });
  }

  const onSubmit = e => {
    e.preventDefault();
    const request = {
      date: dateTemplate.value,
      price: priceTemplate.value
    };

    getEvents(request);
  }

  return (
    <Fragment>

    <form onSubmit={onSubmit}>
        <Typography 
          gutterbutton 
          component="p" 
          variant="p"
          className={classes.actionTitle}
          >
            <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
              Filters
            </Box>
        </Typography>
        <br/>

        <FormControl className={classes.formControl}>
          <Typography 
            gutterbutton 
            component="p" 
            variant="p"
            className={classes.actionTitle}
            >
              <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                Date
              </Box>
          </Typography>
          <Button
            variant={dateTemplate.date.anyDate}
            color="primary"
            onClick={() => onDateChange('anyDate')}
          >
            Any Date
          </Button>
          <Button
            variant={dateTemplate.date.today}
            color="primary"
            onClick={() => onDateChange('today')}
          >
            Today
          </Button>
          <Button
            variant={dateTemplate.date.tomorrow}
            color="primary"
            onClick={() => onDateChange('tomorrow')}
          >
            Tomorrow
          </Button>
        </FormControl>
        <Divider variant="middle" />
        <FormControl className={classes.formControl}>
          <Typography 
            gutterbutton 
            component="p" 
            variant="p"
            className={classes.actionTitle}
            >
              <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                Price
              </Box>
          </Typography>
          <Button
            variant={priceTemplate.price.anyPrice}
            color="primary"
            onClick={() => onPriceChange('anyPrice')}
          >
            Any Price
          </Button>
          <Button
            variant={priceTemplate.price.free}
            color="primary"
            onClick={() => onPriceChange('free')}
          >
            Free
          </Button>
          <Button
            variant={priceTemplate.price.paid}
            color="primary"
            onClick={() => onPriceChange('paid')}
          >
            Paid
          </Button>
        </FormControl>

        {/* <FormControl className={classes.formControl}>
          <Typography 
            gutterbutton 
            component="p" 
            variant="p"
            className={classes.actionTitle}
            >
              <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                Category
              </Box>
          </Typography>
          <Select
            labelId="categorylabel"
            id="category-select"
            name="category"
            value={category}
            color="primary"
            onChange={handleChange}
            className={classes.selectField}
          >
            <MenuItem value={1}>Music</MenuItem>
            <MenuItem value={2}>Entertainment</MenuItem>
            <MenuItem value={3}>Food</MenuItem>
          </Select>
        </FormControl> */}
        <Divider variant="middle" />
        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Apply
          </Button>
        </FormControl>
      </form>
    </Fragment>
  );
};

export default EventFilter;
