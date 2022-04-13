import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './card.css';

export const Card = ({ viewCardAmount, tag }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);
  const [data, setData] = useState([{prompt: 'loading', response: 'loading'}]);

  useEffect((): any => {
    axios.get('http://localhost:3001/api/cards').then((res) => {
      if (res.data.length > 0) {
        setData(res.data[0].cards);
      }
    });
  }, []);

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
          if (currentCard < viewCardAmount - 1) {
            setCurrentCard(currentCard + 1);
            setCurrentView(true);
          }
        }}>
        Next
      </Button>
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
    </div>
  );
};
