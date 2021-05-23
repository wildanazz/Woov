import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const Profile = (props) => {
  const { auth } = props;
  const classes = useStyles();

  useEffect(() => {
    if (auth.userId) {
      console.log('Fetch user data');
    } else {
      window.location.href = '/';
    }
  });

  const renderContent = () => {
    if (auth.userId) {
      return (
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            This is your profile!
          </Typography>
        </Container>
      );
    }
    return (
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Loading!
        </Typography>
      </Container>
    );
  };

  return (
    <div className={classes.heroContent}>
      <CssBaseline />
      {renderContent()}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Profile);
