import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { SelectDropDown } from './SelectDropDown';
import styles from './Create.module.css';
import { ApplicationContext } from '../../app-context';
import { light } from '@mui/material/styles/createPalette';

export const Create = () => {
  const [tag, setTag] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>(null);
  const [createTag, setCreateTag] = useState<boolean>(false);
  const [createCard, setCreateCard] = useState<boolean>(true);
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [inputTag, setInputTag] = useState<string>('');
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [inputResponse, setInputResponse] = useState<string>('');
  const [appState, appAction] = useContext(ApplicationContext);

  const clearNotifications = () => {
    setError('');
    setNotification('');
  };

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
      setInputTag('');
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

    await axios.patch(`/api/cards/private/add/cards`, body).then((res) => {
      setNotification(`Successfully Created`);
      setInputPrompt('');
      setInputResponse('');
    });
    setSubmitStatus(true);
  };

  const handleTagInputChange = (event: any) => {
    setInputTag(event.target.value);
  };

  const handleResponseInputChange = (event: any) => {
    setInputResponse(event.target.value);
  };

  const handlePromptInputChange = (event: any) => {
    setInputPrompt(event.target.value);
  };

  return (
    <div>
      <h1>Create</h1>
      <Stack
        className={styles.createOption}
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        {notification && (
          <Typography variant='body2' className={styles.notification}>
            {notification}
          </Typography>
        )}
        {error && (
          <Typography variant='body2' className={styles.error}>
            {error}
          </Typography>
        )}
      </Stack>
      <Stack
        className={styles.createOption}
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        Create a new tag:{' '}
        <AiFillPlusCircle
          className={styles.createOptionIcon}
          onClick={() => {
            setCreateTag(!createTag);
          }}
        />
      </Stack>

      {createTag && (
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h5'>
            Add new tag
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmitTag}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              className={appState.theme === 'dark' ? styles.inputDark : styles.inputLight}
              margin='normal'
              required
              fullWidth
              id='tag'
              label='Tag'
              name='tag'
              autoComplete='tag'
              autoFocus
              value={inputTag}
              onChange={handleTagInputChange}
            />
            <Button
              className={appState.theme === 'dark' ? styles.darkbutton : styles.lightbutton}
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
        className={styles.createOption}
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}>
        Create a card:{' '}
        <AiFillPlusCircle
          className={styles.createOptionIcon}
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
          {allTags && (
            <SelectDropDown options={allTags} tracker={setTag} label='Tag' />
          )}
          <Box
            component='form'
            onSubmit={handleSubmitCard}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              className={appState.theme === 'dark' ? styles.inputDark : styles.inputLight}
              margin='normal'
              required
              fullWidth
              id='tag'
              label='Prompt'
              name='prompt'
              autoComplete='prompt'
              autoFocus
              value={inputPrompt}
              onChange={handlePromptInputChange}
            />
            <TextField
              className={appState.theme === 'dark' ? styles.inputDark : styles.inputLight}
              margin='normal'
              required
              fullWidth
              id='response'
              label='Response'
              name='response'
              autoComplete='response'
              autoFocus
              value={inputResponse}
              onChange={handleResponseInputChange}
            />
            <Button
              className={appState.theme === 'dark' ? styles.darkbutton : styles.lightbutton}
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
