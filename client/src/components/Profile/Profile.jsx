import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DropzoneDialog } from 'material-ui-dropzone';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import {
  fetchUser,
  editProfileInfo,
  uploadProfilePicture,
} from '../../actions';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(13),
    width: theme.spacing(13),
  },
  text: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = (props) => {
  const {
    fetchUserConnect,
    auth,
    editProfileConnect,
    uploadProfilePictureConnect,
  } = props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [firstName, setFirstName] = useState(auth.user.firstName);
  const [lastName, setLastName] = useState(auth.user.lastName);
  const classes = useStyles();

  useEffect(() => {
    fetchUserConnect();
  }, []);

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleSave = (imageFile) => {
    uploadProfilePictureConnect(auth.user._id, imageFile);
    setIsOpened(false);
  };

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfileConnect(auth.user._id, firstName, lastName);
    setIsDisabled(true);
  };

  const renderButton = () => {
    if (isDisabled) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleEdit}
        >
          Edit
        </Button>
      );
    }
    return (
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    );
  };

  const renderContent = () => {
    if (auth.user) {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <IconButton onClick={handleOpen}>
              <Avatar
                className={classes.avatar}
                src={auth.user ? auth.user.image : ''}
              />
            </IconButton>
            <DropzoneDialog
              open={isOpened}
              onSave={(imageFile) => {
                handleSave(imageFile);
              }}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews
              maxFileSize={5000000}
              filesLimit={1}
              onClose={handleClose}
              dropzoneText="Upload Picture"
            />
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">First Name</Typography>
                  <OutlinedInput
                    value={firstName}
                    disabled={isDisabled}
                    id="outlined-adornment-amount"
                    fullWidth
                    onChange={handleFirstNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Last Name</Typography>
                  <OutlinedInput
                    value={lastName}
                    disabled={isDisabled}
                    id="outlined-adornment-amount"
                    fullWidth
                    onChange={handleLastNameChange}
                  />
                </Grid>
              </Grid>
              {renderButton()}
            </form>
            <Typography variant="h6" className={classes.text}>
              Change Password
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Current Password</Typography>
                  <OutlinedInput
                    disabled={isDisabled}
                    id="outlined-adornment-amount"
                    type="password"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">New Password</Typography>
                  <OutlinedInput
                    disabled={isDisabled}
                    id="outlined-adornment-amount"
                    type="password"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Confirm Password</Typography>
                  <OutlinedInput
                    disabled={isDisabled}
                    id="outlined-adornment-amount"
                    type="password"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility">
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
              {renderButton()}
            </form>
          </div>
        </Container>
      );
    }
    return null;
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

export default connect(mapStateToProps, {
  fetchUserConnect: fetchUser,
  editProfileConnect: editProfileInfo,
  uploadProfilePictureConnect: uploadProfilePicture,
})(Profile);
