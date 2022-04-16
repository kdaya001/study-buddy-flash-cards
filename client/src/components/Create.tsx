import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Create = () => {
  const [tag, setTag] = useState<any>([]);
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`/api/cards/private/get/tags`).then((res) => {
      console.log(res.data);
      setSubmitStatus(false);
    });
  }, [submitStatus]);

  const handleSubmitTag = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      tag: data?.get('tag'),
    };
    const tagExists = await axios.get(`/api/cards/private/${body.tag}`)
    if(!!!tagExists?.data) {
      await axios.post(`/api/cards/private/create/tag`, body).then((res) => {
        console.log('successfully created');
      });
      setSubmitStatus(true);
    } else {
      console.log('tag already exists');
    }

  };

  return (
    <div>
      <h1>Create</h1>
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
    </div>
  );
};
