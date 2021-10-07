import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';
import Copyright from '../../component/copyright';
import Background from '../../img/background.png';
import EditField from '../../component/edit-field';
import { validateData, validateSingIn } from '../../helpers/validation.helper';
import { AuthService } from '../../services/auth.service';
import notificationCreator from '../../helpers/notification.helper';

const useStyles = makeStyles({
  container: {
    height: '100vh'
  },
  leftSide: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10%',
    gap: '20px'
  },
  lock: {
    backgroundColor: 'var(--azure-blue)',
    margin: 'auto'
  },
  fieldsContainer: {
    width: '420px'
  },
  fields: {
    width: '380px'
  },
  link: {
    display: 'flex',
    gap: '100px'
  },
  button: {
    width: '420px'
  },
  copyright: {
    textAlign: 'center'
  }
});

const SignIn = ({ login }) => {
  const classes = useStyles();

  const [singInData, setSingInData] = useState({});
  const [errors, setErrors] = useState({});

  const handlerChangeSingInData = (name, value) => {
    setSingInData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };
  const handlerSignIn = async () => {
    const resultSingIn = validateData(singInData, validateSingIn);

    if (resultSingIn.isValid) {
      await AuthService.signIn(singInData)
        .then((data) => {
          login(data.token);
        })
        .catch((error) => {
          notificationCreator.showOnFailure(`${error.message}`);
        });
    } else {
      setErrors(resultSingIn.errors);
    }
  };
  return (
    <Grid container className={classes.container} component="main">
      <Grid item xs={false} sm={4} md={7} className={classes.leftSide} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box className={classes.rightSide}>
          <Box>
            <Avatar className={classes.lock}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <Box className={classes.fieldsContainer}>
            <EditField
              fieldLabel="Email"
              placeholder="Enter email"
              name="email"
              type="email"
              classNameInput={classes.fields}
              onChange={handlerChangeSingInData}
              value={singInData.email}
              error={errors.email}
            />
            <EditField
              fieldLabel="Password"
              placeholder="Enter password"
              name="password"
              type="password"
              classNameInput={classes.fields}
              onChange={handlerChangeSingInData}
              value={singInData.password}
              error={errors.password}
            />
          </Box>
          <Button
            type="submit"
            onClick={handlerSignIn}
            className={classes.button}
            variant="contained"
          >
            Sign In
          </Button>
          <Box className={classes.link}>
            <Link href="/" variant="body2">
              Forgot password?
            </Link>
            <Link href="/" variant="body2">
              Don&apos;t have an account? Sign Up
            </Link>
          </Box>
          <Copyright className={classes.copyright} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;

SignIn.propTypes = {
  login: PropTypes.func
};
