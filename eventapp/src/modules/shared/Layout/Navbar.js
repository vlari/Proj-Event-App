import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuth } from '../../../hooks/use-auth';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color: '#3F51B5',
    padding: '0px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#e6e6e6',
    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a6a6a6'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navbarLink: {
    color: '#4d4d4d',
    paddingLeft: '20px',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const Navbar = (props) => {
  const auth = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  useEffect(() => {
    auth.getUser();
    // eslint-disable-next-line
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onSignout = () => {
    auth.signOut();
    props.history.push('/events');
  };

  const menuId = 'layout-search-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography component="p">
          { auth.user && auth.user.name }
        </Typography>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleMenuClose}>
        <Link 
          component={RouterLink} 
          className={classes.navbarLink}
          style={{ padding: '0' }} 
          to='/user/tickets'>
          Tickets
        </Link>
      </MenuItem> 
      <MenuItem onClick={handleMenuClose}>
        <Link
          component={RouterLink} 
          className={classes.navbarLink} 
          style={{ padding: '0' }}
          to='/events/favorite'>
          Liked
        </Link>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={onSignout}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography component="p" variant="h5">
          User Name
        </Typography>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleMenuClose}>
        <Link 
          component={RouterLink} 
          className={classes.navbarLink}
          style={{ padding: '0' }} 
          to='/user/tickets'>
          Tickets
        </Link>
      </MenuItem> 
      <MenuItem onClick={handleMenuClose}>
        <Link
          component={RouterLink} 
          className={classes.navbarLink} 
          style={{ padding: '0' }}
          to='/events/favorite'>
          Liked
        </Link>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={onSignout}>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );

  const defaultRoutes = (
      <Typography>
        <Link 
          component={RouterLink} 
          className={classes.navbarLink} 
          to='/signin'>
          Sign In
        </Link>
      </Typography>
  );

  const userRoutes = (
      <Typography>
        <Link 
          component={RouterLink} 
          className={classes.navbarLink} 
          to='/events/favorite'>
          Likes
        </Link>
        <Link 
          component={RouterLink} 
          className={classes.navbarLink} 
          to='/user/tickets'>
          Tickets
        </Link>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
          <AccountCircle />
        </IconButton> 
      </Typography>
  );

  return (
    <div className={classes.grow}>
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Link component={RouterLink} className={classes.navbarLink} to='/'>
          <Typography className={classes.title} variant="h6" noWrap>
            E
          </Typography>
        </Link>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          { auth.user ? userRoutes : defaultRoutes }
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    <Toolbar />
    {renderMobileMenu}
    {renderMenu}
  </div>
  )
}

export default withRouter(Navbar);
