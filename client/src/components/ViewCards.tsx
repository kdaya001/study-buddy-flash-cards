import { Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../app-context';
import { Cards } from './Cards';
import { SelectDropDown } from './SelectDropDown';
import './signin.css'

export const ViewCards = ({ start, setStart }: any) => {
  const [appState, appAction] = useContext(ApplicationContext);

  const [publicTags, setPublicTags] = useState<any>([]);
  const [privateTags, setPrivateTags] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>([]);

  const [tag, setTag] = useState<any>(null);
  const [cardData, setCardData] = useState<any>([]);

  const [viewCardAmount, setViewCardAmount] = useState<Number>(0);
  const [viewCardOptions, setViewCardOptions] = useState<any>([]);

  //Get data when tags change
  useEffect((): any => {
    if (tag) {
      axios.get(`/api/cards/get/${tag.id}`).then((res) => {
        if (res.data.length > 0) {
          setCardData(res.data[0].cards);
          setViewCardAmount(cardData.length);
        }
      });
    }
  }, [tag]);

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
    if (cardData.length > 0) {
      setStart(!start);
    }
  };

  useEffect(() => {
    const options = [];
    if (cardData.length > 0 && cardData.length < 10) {
      options.push({ _id: 1, option: cardData.length });
    } else if (cardData.length >=10) {
      let count = 0;
      for(let i = 10; i <= cardData.length; i+= 10) {
        options.push({ _id: count, option: i });
        count++;
      }
    }
    setViewCardOptions(options);
  }, [cardData]);

  return (
    <div>
      {!start && (
        <>
          <h1>Choose your poison</h1>
          <SelectDropDown options={allTags} tracker={setTag} label='Topic' />
          {cardData.length > 0 && (
            <SelectDropDown
              tracker={setViewCardAmount}
              options={viewCardOptions}
              label='Amount'
            />
          )}
          <Button
            onClick={handleStart}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Start
          </Button>
        </>
      )}

      {start && (
        <>
          <Cards data={cardData} tag={tag.tag} amount={viewCardAmount}/>
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
