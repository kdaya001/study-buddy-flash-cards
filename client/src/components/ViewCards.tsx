import { Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../app-context';
import { Cards } from './Cards';
import { SelectDropDown } from './SelectDropDown';

export const ViewCards = () => {
  const [start, setStart] = useState<boolean>(false);
  const [appState, appAction] = useContext(ApplicationContext);

  const [publicTags, setPublicTags] = useState<any>([]);
  const [privateTags, setPrivateTags] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>([]);

  const [tag, setTag] = useState<any>(null);
  // const [cardData, setCardData] = useState<any>([]);

  // const [viewCardAmount, setViewCardAmount] = useState<Number>(0);

  // Get total cards


  // Get public tags
  useEffect((): any => {
    axios.get(`/api/cards/public/get/tags`).then((res) => {
      console.log('public', res.data);
      if (res.data.length > 0) {
        setPublicTags(res.data);
      }
    });
  }, []);

  // Get private tags
  useEffect(() => {
    if (appState.currentUser) {
      axios.get(`/api/cards/private/get/tags`).then((res) => {
        console.log('private', res.data);
        if (res.data.length > 0) {
          setPrivateTags(res.data);
        } else {
          setPrivateTags([]);
        }
      });
    }
  }, [appState.currentUser]);

  // Merge tags together
  useEffect(() => {
    setAllTags([...publicTags, ...privateTags]);
    console.log('all tags', allTags);
  }, [publicTags, privateTags]);

  /**
   * Axios => Get public tags
   * Axios => Get private cards
   *
   * Combine both, if logged out, private tags need to be removed
   *
   * Dropdown component
   *  --> Send state for tag and amount
   *
   * Card component
   *  * pass the data?
   */

  return (
    <div>
      {!start && (
        <>
          <Button
            onClick={() => {
              setStart(!start);
            }}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Start
          </Button>

          <SelectDropDown options={allTags} />
          <SelectDropDown
            options={[
              { id: '123', option: 'option1' },
              { id: '345', option: 'option2' },
            ]}
          />
        </>
      )}

      {start && (
        <>
          <Cards
            data={[{ prompt: 'testprompt', response: 'test' }]}
            tag='test'
          />
          <Button
            onClick={() => {
              setStart(!start);
            }}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Back
          </Button>
        </>
      )}
    </div>
  );
};
