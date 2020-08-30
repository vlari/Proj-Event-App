import React , { Fragment } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root:{
    background: '#3F51B5'
  },
  github: {
    color: '#FFFFFF'
  }
});

const Footer = () => {
  const styles = useStyles();

  return (
    <Fragment>
      <div className={styles.root}>
        <IconButton className={styles.github} href="https://github.com/vlari" aria-label="github account">
          <GitHubIcon />
        </IconButton>
      </div>
    </Fragment>
  )
}

export default Footer;
