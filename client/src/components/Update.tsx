import { Box, Button, FormControl, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SelectDropDown } from './SelectDropDown';
import './update.css';

export const Update = () => {
  const [data, setData] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);

  useEffect(() => {
    if (tag) {
      axios.get(`/api/cards/get/${tag?.id}`).then((res) => {
        setData(res.data[0]);
      });
    }
  }, [tag]);

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

    // const body = [];
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
        console.log('successfully updated');
      });
    }
  };

  return (
    <div>
      <h1>Update Your Cards</h1>
      <FormControl className='update_form' sx={{ m: 1, minWidth: 600 }}>
        {allTags && (
          <SelectDropDown
            classname='selection'
            options={allTags}
            tracker={setTag}
            label='Tag'
          />
        )}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {data?.cards &&
            data?.cards.map((item: any, idx: number) => {
              return (
                <div key={idx}>
                  <h5>Card #{idx + 1}</h5>
                  <TextField
                    className='update_input'
                    label='prompt'
                    id={`${idx}-prompt`}
                    name={`${idx}-prompt`}
                    fullWidth
                    defaultValue={item.prompt}
                  />
                  <TextField
                    className='update_input'
                    label='response'
                    id={`${idx}-response`}
                    name={`${idx}-response`}
                    fullWidth
                    defaultValue={item.response}
                  />
                </div>
              );
            })}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};
