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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useContext, useState } from 'react';
import { ActionType, ApplicationContext } from '../../app-context';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.css';

const theme = createTheme();

export default function Signin() {
  const [appState, appAction] = useContext(ApplicationContext);
  const [error, setError] = useState<null | string>(null);
  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);

    const body = {
      email: data.get('email'),
      password: data.get('password'),
    };

    //TODO look at logic
    const userExists = await axios.get(
      `/api/users/getByEmail/${data.get('email')}`
    );
    if (userExists?.data) {
      axios
        .post(`/api/sessions/`, body)
        .then((res) => {
          appAction({
            type: ActionType.LOGIN,
            payload: {
              user: {
                email: res.data?.email,
              },
            },
          });
          setTimeout(() => {
            navigate(`/`);
          }, 1000);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      setError('Invalid email or password');
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
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {error && (
            <Typography variant='body2' color='error' className={styles.error}>
              {error}
            </Typography>
          )}
          {appState.currentUser && (
            <Typography variant='body2' className={styles.successful}>
              Successfully logged in
            </Typography>
          )}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              className={appState.theme === 'dark' ? styles.inputDark : ''}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              className={appState.theme === 'dark' ? styles.inputDark : ''}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
