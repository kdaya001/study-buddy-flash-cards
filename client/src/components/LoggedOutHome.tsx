import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signin from './profile/Signin';
import styles from './LoggedOutHome.module.css';
import { useContext } from 'react';
import { ApplicationContext } from '../app-context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const theme = createTheme();

export default function LoggedOutHome() {
  const [appState, appAction] = useContext(ApplicationContext);

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${require('../assets/home.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          className={appState.theme === 'dark' ? styles.dark : styles.light}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <div>
              <h1>Study Buddy</h1>
              <h4>
                Your only study buddy app to help you study everything and
                anything. Create flash cards to help you revise content you want
                to learn!
              </h4>
            </div>
            <Signin />

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
