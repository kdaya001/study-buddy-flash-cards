import { Button } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../app-context';
import { getSession } from '../helper/getSession';
import './card.css';

export const Card = ({ viewCardAmount, tag, data, setData }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);

getSession();
  useEffect((): any => {
    axios.get(`/api/cards/public/${tag}`).then((res) => {
      if (res.data.length > 0) {
        setData(res.data[0].cards);
      }
    });
  }, [tag]);

  return (
    <div>
      <div
        className='card_card-container'
        onClick={() => {
          setCurrentView(!currentView);
        }}>
          <div className="card_card-content">
        {currentView
          ? data[currentCard].prompt
          : data[currentCard].response}
          </div>
      </div>

      <Button
        variant='contained'
        onClick={() => {
          if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
            setCurrentView(true);
          }
        }}>
        Back
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          if (currentCard < viewCardAmount - 1) {
            setCurrentCard(currentCard + 1);
            setCurrentView(true);
          }
        }}>
        Next
      </Button>
    </div>
  );
};
