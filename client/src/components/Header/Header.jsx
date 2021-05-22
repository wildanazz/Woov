import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { signOutUser } from '../../actions';

const useStyles = makeStyles(() => ({
  header: {
    paddingRight: '50px',
    paddingLeft: '50px',
    position: 'relative',
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '15px',
    marginLeft: '30px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const headersDataSignedIn = [
  {
    label: 'Profile',
    href: '/profile',
  },
  {
    label: 'Sign Out',
    href: '/',
  },
];

const headersDataSignedOut = [
  {
    label: 'Sign In',
    href: '/signin',
  },
  {
    label: 'Sign Up',
    href: '/signup',
  },
];

const Header = (props) => {
  const { signOutUserConnect, auth } = props;
  const classes = useStyles();

  const getMenuButtons = () => {
    if (auth.userId) {
      return headersDataSignedIn.map(({ label, href }) => {
        if (label === 'Profile') {
          return (
            <Button
              {...{
                key: label,
                color: 'inherit',
                to: href,
                component: Link,
                className: classes.menuButton,
              }}
            >
              {label}
            </Button>
          );
        }
        return (
          <Button
            {...{
              key: label,
              color: 'inherit',
              to: href,
              component: 'button',
              className: classes.menuButton,
              onClick: () => {
                signOutUserConnect();
              },
            }}
          >
            {label}
          </Button>
        );
      });
    }

    return headersDataSignedOut.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: 'inherit',
            to: href,
            component: Link,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" color="inherit" className={classes.logo}>
            WOOV
          </Typography>
        </Link>
        <div>{getMenuButtons()}</div>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { signOutUserConnect: signOutUser })(
  Header
);
