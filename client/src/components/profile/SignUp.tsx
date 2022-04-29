import { useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import styles from './profile.module.css';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../app-context';
import { MdOutlineLock } from 'react-icons/md';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [confirmPassword, setConfirmPassword] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  let navigate = useNavigate();
  const [appState, appAction] = useContext(ApplicationContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let validPassword =
      password === confirmPassword &&
      password &&
      confirmPassword &&
      password.length > 0 &&
      confirmPassword.length > 0;

    setError(null);

    if (!email?.includes('@')) {
      setError('Enter a valid email');
    } else if (!password || !confirmPassword) {
      validPassword = false;
      setError('Enter a valid password');
    } else if (password && password.length < 8) {
      validPassword = false;
      setError('Password too short');
    } else if (!validPassword) {
      validPassword = false;
      setError('Passwords do not match');
    }

    if (validPassword && email && password) {
      const body = {
        email: email,
        password: password,
        confirmedPassword: confirmPassword,
      };
      axios
        .post(`/api/users`, body)
        .then((res) => {
          navigate(`/login`);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <MdOutlineLock size={25} />
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          {error && (
            <Typography variant='body2' color='error' className={styles.error}>
              {error}
            </Typography>
          )}
          <div className={styles.container}>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={styles.input}
                    required
                    fullWidth
                    id='email'
                    placeholder='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={styles.input}
                    required
                    fullWidth
                    name='password'
                    placeholder='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={styles.input}
                    required
                    fullWidth
                    name='password'
                    placeholder='Password'
                    type='password'
                    id='password-confirmation'
                    autoComplete='new-password'
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                className={
                  appState.theme === 'dark'
                    ? styles.buttonDark
                    : styles.buttonLight
                }
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                    <h4 className={styles.link} onClick={() => {
                      navigate('/login');
                    }}>Already have an account? Sign in</h4>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
