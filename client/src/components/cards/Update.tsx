import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../app-context';
import { SelectDropDown } from './SelectDropDown';
import styles from './Update.module.css';

export const Update = () => {
  const [data, setData] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);
  const [appState] = useContext(ApplicationContext);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setData([])
  }, [tag]);

  useEffect(() => {
    if (tag) {
      axios.get(`/api/cards/get/${tag?.id}`).then((res) => {
        setData(res.data[0]);
      });
    }
  }, [tag])

  useEffect(() => {
    axios.get(`/api/cards/private/get/tags`).then((res) => {
      if (res.data.length > 0) {
        setAllTags(res.data);
      }
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const body: any = {
      tag: data?.tag,
      cards: [],
    };

    for (let i = 0; i < data?.cards.length; i++) {
      const tempData: any = {
        prompt: formData.get(`${i}-prompt`),
        response: formData.get(`${i}-response`),
      };
      body.cards.push(tempData);
    }

    if (body?.cards.length > 0) {
      axios.put('/api/cards/update/cards', body).then((response) => {
        setNotification('Successfully updated');
        window.scrollTo(0, 0);
      });
    }
  };

  return (
    <div className={styles.outerContainer}>
      <h1>Update Your Cards</h1>
      <FormControl className={styles.updateForm} sx={{ m: 1 }}>
        {notification && (
          <Typography
            variant='body2'
            color='green'
            className={styles.notification}>
            {notification}
          </Typography>
        )}
        <h4>Select topic to update:</h4>
        <div className={styles.updateContainer}>
          {allTags && (
            <SelectDropDown options={allTags} tracker={setTag} label='Tag' />
          )}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            {data?.cards &&
              data?.cards.map((item: any, idx: number) => {
                return (
                  <div key={idx}>
                    <h5>Card #{idx + 1}</h5>
                    <TextField
                      className={
                        appState.theme === 'dark'
                          ? styles.inputDark
                          : styles.inputLight
                      }
                      label='prompt'
                      id={`${idx}-prompt`}
                      name={`${idx}-prompt`}
                      fullWidth
                      defaultValue={item.prompt}
                    />
                    <TextField
                      className={
                        appState.theme === 'dark'
                          ? styles.inputDark
                          : styles.inputLight
                      }
                      label='response'
                      id={`${idx}-response`}
                      name={`${idx}-response`}
                      fullWidth
                      defaultValue={item.response}
                    />
                  </div>
                );
              })}
            {data?.cards && (
              <Button
                className={
                  appState.theme === 'dark'
                    ? styles.darkbutton
                    : styles.lightbutton
                }
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            )}
          </Box>
        </div>
      </FormControl>
    </div>
  );
};
