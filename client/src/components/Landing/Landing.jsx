import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fetchUser } from '../../actions';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const Landing = (props) => {
  const { auth, fetchUserConnect } = props;
  const classes = useStyles();

  useEffect(() => {
    fetchUserConnect();
  }, []);

  const renderContent = () => {
    if (auth.user) {
      return (
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Hi {auth.user.firstName}!
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
          Welcome!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
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

export default connect(mapStateToProps, { fetchUserConnect: fetchUser })(
  Landing
);
