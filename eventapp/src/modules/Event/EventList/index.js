import React, { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import EventItem from '../../Event/EventItem';

const useStyles = makeStyles( (theme) => ({
  layout: {
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  selectField: {
    left: '30px'
  },
  actionPanel: {
    backgroundColor: '#f2f2f2',
    height: '900px'
  }
}));

const EventList = () => {
  const classes = useStyles();
  const [date, setDate] = React.useState('Today');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('anyprice');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <Fragment>
      <CssBaseline />
      <Grid 
        container 
        maxwidth="lg"
        className={classes.layout}>
        <Grid item md={2} className={classes.actionPanel}>
          <form >
            <Typography 
              gutterbutton 
              component="p" 
              variant="p"
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
                >
                  <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                    Date
                  </Box>
              </Typography>
              <Select
                labelId="datelabel"
                id="date-select"
                value={date}
                color="primary"
                onChange={handleChange}
                className={classes.selectField}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Tomorrow</MenuItem>
                <MenuItem value={30}>Pick a date</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Typography 
                gutterbutton 
                component="p" 
                variant="p"
                >
                  <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                    Category
                  </Box>
              </Typography>
              <Select
                labelId="categorylabel"
                id="category-select"
                value={category}
                color="primary"
                onChange={handleChange}
                className={classes.selectField}
              >
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>Tomorrow</MenuItem>
                <MenuItem value={30}>Pick a date</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Typography 
                gutterbutton 
                component="p" 
                variant="p"
                >
                  <Box fontWeight="fontWeightMedium" m={1} fontSize={18}>
                    Price
                  </Box>
              </Typography>
              {/* <FormControl component="fieldset" className={classes.selectField}> */}
                {/* <RadioGroup 
                  aria-label="price" 
                  name="price" 
                  value={price} 
                  onChange={handleChange}
                  style={{ fontSize: '14px'}}
                  >
                  <FormControlLabel value="anyprice" control={ <Radio color="primary"/>} />
                  <FormControlLabel value="free" control={<Radio color="primary" />} label="Free"/>
                  <FormControlLabel value="paid" control={<Radio color="primary" />} label="Paid"/>
                </RadioGroup> */}
                <FormControl component="fieldset" className={classes.selectField}>
                  <Typography component="p" variant="p">
                    <Radio
                      checked={price === 'anyprice'}
                      onChange={handleChange}
                      value="anyprice"
                      name="anyprice"
                      inputProps={{ 'aria-label': 'A' }}
                      color="primary"
                    />
                    Any Price
                  </Typography>
                  <Typography component="p" variant="p">
                    <Radio
                      checked={price === 'free'}
                      onChange={handleChange}
                      value="free"
                      name="free"
                      inputProps={{ 'aria-label': 'B' }}
                      color="primary"
                    />
                    Free
                  </Typography>
                  <Typography component="p" variant="p">
                    <Radio
                      checked={price === 'paid'}
                      onChange={handleChange}
                      value="paid"
                      name="paid"
                      inputProps={{ 'aria-label': 'C' }}
                      color="primary"
                    />
                    Paid
                  </Typography>
              </FormControl>
            </FormControl>
          </form>
        </Grid>
        <Grid item md={8}>
          <EventItem isFlat={true} />           
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default EventList
