import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ActionType, ApplicationContext } from '../app-context';

export function Nav({ setStart }: any) {
  const [appState, appAction] = useContext(ApplicationContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    axios.delete('/api/sessions/').then(() => {
      appAction({
        type: ActionType.LOGOUT,
      });
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='nav_navbar' position='static'>
        <Toolbar>
          <Typography
            onClick={() => {
              navigate(`/`);
            }}
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            Study Buddy
          </Typography>
          <Button
            color='inherit'
            onClick={() => {
              setStart(false);
              navigate(`/`);
            }}>
            Home
          </Button>
          {!appState.currentUser && (
            <Button
              color='inherit'
              onClick={() => {
                setStart(false);
                navigate(`/signup`);
              }}>
              SignUp
            </Button>
          )}
          {!appState.currentUser && (
            <Button
              color='inherit'
              onClick={() => {
                setStart(false);
                navigate(`/login`);
              }}>
              Login
            </Button>
          )}
          {appState.currentUser && (
            <Button
              color='inherit'
              onClick={() => {
                setStart(false);
                navigate(`/create`);
              }}>
              Create
            </Button>
          )}
          {appState.currentUser && (
            <Button
              color='inherit'
              onClick={() => {
                setStart(false);
                navigate(`/update`);
              }}>
              Update Cards
            </Button>
          )}
          {appState.currentUser && (
            <Button
              color='inherit'
              onClick={() => {
                handleLogout();
                setStart(false);
                navigate(`/login`);
              }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
