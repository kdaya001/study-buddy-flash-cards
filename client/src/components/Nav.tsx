import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Nav({ setStart }: any) {
  let navigate = useNavigate();

  const handleLoginClick = () => {
    let path = `login`;
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Study Buddy
          </Typography>
          <Button color='inherit' onClick={handleLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
