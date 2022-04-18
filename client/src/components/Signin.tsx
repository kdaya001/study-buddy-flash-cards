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
import { useContext } from 'react';
import { ActionType, ApplicationContext } from '../app-context';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Signin() {
  const [appState, appAction] = useContext(ApplicationContext);
  let navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      axios.post(`/api/sessions/`, body).then((res) => {
        appAction({
          type: ActionType.LOGIN,
          payload: {
            user: {
              email: res.data?.email,
            },
          },
        });
      });
    }

    setTimeout(() => {
      navigate(`/`);
    }, 5000);
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
          {appState.currentUser && (
            <Typography variant='body2' className='notification'>Successfully logged in</Typography>
          )}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
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
