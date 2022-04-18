import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { SelectDropDown } from './SelectDropDown';

export const Create = () => {
  const [tag, setTag] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>(null);
  const [createTag, setCreateTag] = useState<boolean>(false);
  const [createCard, setCreateCard] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`/api/cards/private/get/tags`).then((res) => {
      if (res.data.length > 0) {
        setAllTags(res.data);
      }
      setSubmitStatus(false);
    });
  }, [submitStatus]);

  const handleChange = (event: any) => {
    setTag(event.target.value);
  };

  const handleSubmitTag = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      tag: data?.get('tag'),
    };
    const tagExists = await axios.get(`/api/cards/private/${body.tag}`);
    if (!!!tagExists?.data) {
      await axios.post(`/api/cards/private/create/tag`, body).then((res) => {
        console.log('successfully created');
      });
      setSubmitStatus(true);
    } else {
      console.log('tag already exists');
    }
  };

  const handleSubmitCard = async (event: React.FormEvent<HTMLFormElement>) => {
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

    console.log(body);
    await axios.post(`/api/cards/private/update/cards`, body).then((res) => {
      console.log('successfully created');
    });
    setSubmitStatus(true);
  };

  return (
    <div>
      <h1>Create</h1>
      Create a new tag:{' '}
      <AiFillPlusCircle
        onClick={() => {
          setCreateTag(!createTag);
        }}
      />
      Create a card tag:{' '}
      <AiFillPlusCircle
        onClick={() => {
          setCreateCard(!createCard);
        }}
      />
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
      {createCard && (
        <Container component='main' maxWidth='xs'>
          <Typography component='h1' variant='h5'>
            Create new cards
          </Typography>
          <SelectDropDown options={allTags} tracker={setTag} label="Tag" />
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
