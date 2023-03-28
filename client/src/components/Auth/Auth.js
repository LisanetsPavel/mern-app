import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import Input from './input';
import useStyles from './styles';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState();
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    const decoded = jwtDecode(res?.credential);

    try {
      dispatch({ type: AUTH, data: { result: decoded, token: res?.credential } });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = (error) => {
    console.error('Google Sign In was unsuccessful. Try Again Later. ', error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" onChange={handleChange} half />
              <Input name="lastName" label="Last Name" onChange={handleChange} half />
            </>
            ) }
            <Input name="email" label="Email Address" onChange={handleChange} type="email" />
            <Input name="password" label="Password" onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup
                && <Input name="confirmPassword" label="Repeat Password" onChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign In' : 'Dont`t have an account? Sign Up' }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
