import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { SelectDropDown } from './SelectDropDown';
import './create.css';

export const Create = () => {
  const [tag, setTag] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>(null);
  const [createTag, setCreateTag] = useState<boolean>(false);
  const [createCard, setCreateCard] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clearNotifications = () => {
    setError('');
    setNotification('');
  }

  useEffect(() => {
    axios.get(`/api/cards/private/get/tags`).then((res) => {
      if (res.data.length > 0) {
        setAllTags(res.data);
      }
      setSubmitStatus(false);
    });
  }, [submitStatus]);

  const handleSubmitTag = async (event: React.FormEvent<HTMLFormElement>) => {
    clearNotifications();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      tag: data?.get('tag'),
    };
    const tagExists = await axios.get(`/api/cards/private/${body.tag}`);
    if (!!!tagExists?.data) {
      await axios.post(`/api/cards/private/create/tag`, body).then((res) => {
        setNotification(`Successfully Created`);
      });
      setSubmitStatus(true);
    } else {
      setError(`Tag Already Exists`);
    }
  };

  const handleSubmitCard = async (event: React.FormEvent<HTMLFormElement>) => {
    clearNotifications();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      tag: tag?.tag,
      cards: [
        {
          prompt: data?.get('prompt'),
          response: data?.get('response'),
        },
      ],
    };

    await axios.post(`/api/cards/private/add/cards`, body).then((res) => {
      setNotification(`Successfully Created`);
    });
    setSubmitStatus(true);
  };

  return (
    <div>
      <h1>Create</h1>
      <Stack
        className='create-option'
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
      {notification && (
        <Typography variant='body2' className='notification'>
          {notification}
        </Typography>
      )}
      {error && (
        <Typography variant='body2' className='error'>
          {error}
        </Typography>
      )}
      </Stack>
      <Stack
        className='create-option'
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        Create a new tag:{' '}
        <AiFillPlusCircle
          className='create-option-icon'
          onClick={() => {
            setCreateTag(!createTag);
          }}
        />
      </Stack>

      {createTag && (
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h5'>
            Create new tag
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmitTag}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='tag'
              label='Tag'
              name='tag'
              autoComplete='tag'
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Container>
      )}

      <Stack
        className='create-option'
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        Create a card:{' '}
        <AiFillPlusCircle
          className='create-option-icon'
          onClick={() => {
            setCreateCard(!createCard);
          }}
        />
      </Stack>

      {createCard && (
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h5'>
            Create new cards
          </Typography>
          <SelectDropDown options={allTags} tracker={setTag} label='Tag' />
          <Box
            component='form'
            onSubmit={handleSubmitCard}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='tag'
              label='Prompt'
              name='prompt'
              autoComplete='prompt'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='response'
              label='Response'
              name='response'
              autoComplete='response'
              autoFocus
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Container>
      )}
    </div>
  );
};
