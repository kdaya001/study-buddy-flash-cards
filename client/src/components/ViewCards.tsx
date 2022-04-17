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
  const [cardData, setCardData] = useState<any>([]);

  const [viewCardAmount, setViewCardAmount] = useState<Number>(0);


  //Get data when tags change
  useEffect((): any => {
    if (tag) {
      axios.get(`/api/cards/get/${tag.id}`).then((res) => {
        if (res.data.length > 0) {
          setCardData(res.data[0].cards);
        }})
        console.log(cardData);
      }
  }, [tag])


  // Get public tags
  useEffect((): any => {
    axios.get(`/api/cards/public/get/tags`).then((res) => {
      if (res.data.length > 0) {
        setPublicTags(res.data);
      }
    });
  }, []);

  // Get private tags
  useEffect(() => {
    if (appState.currentUser) {
      axios.get(`/api/cards/private/get/tags`).then((res) => {
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
  }, [publicTags, privateTags]);

  const handleStart = () => {
    if(cardData.length > 0) {
      setStart(!start);
    }
  }

  return (
    <div>
      {!start && (
        <>
          <Button
            onClick={handleStart}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Start
          </Button>

          <SelectDropDown options={allTags} tracker={setTag}/>
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
            data={cardData}
            tag={tag.tag}
          />
          <Button
            onClick={handleStart}
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
