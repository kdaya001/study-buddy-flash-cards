import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../app-context';

export const UpdateTag = ({ tag, setTag }: any) => {
  const [appState, appAction] = useContext(ApplicationContext);
  const [allTags, setAllTags] = useState<any>([]);

  const handleChange = (event: any) => {
    setTag({tag: event.target.dataset.value, id: event.target.dataset.id});
  };

  useEffect((): any => {
    axios.get(`/api/cards/public/get/tags`).then((res) => {
      if(!tag) {
        const {_id, tag} = res.data[0];
        setTag({id: String(_id), tag: tag})
      }

      if (res.data.length > 0) {
        setAllTags(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (appState.currentUser) {
      axios.get(`/api/cards/private/get/tags`).then((res) => {
        if (res.data.length > 0) {
          setAllTags((existingTags: any) => {
            return [...existingTags, ...res.data];
          });
        }
      });
    }
  }, [appState.currentUser]);

  return (
    <div>
      {tag && (
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>Flash Card Amount</InputLabel>
        <Select
          labelId='view-card-simple-select-label'
          id='view-card-simple-select'
          value={tag.tag}
          label='cardAmount'
          defaultValue=''
          >
          {allTags.map((tag: any) => {
            return (
              <MenuItem onClick={handleChange} key={tag._id} value={tag.tag} data-id={tag._id}>
                {tag.tag}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      )}
    </div>
  );
};
