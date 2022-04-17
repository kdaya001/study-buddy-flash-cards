import { Button } from '@mui/material';
import { useState } from 'react';
import './cards.css'

export const Cards = (props: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);

  return (
    <div>
      {/* Heading for topic */}
      <h1>{props.tag}</h1>
      {/* card itself allows front and back*/}
      <div
        className='card_card-container'
        onClick={() => {
          setCurrentView(!currentView);
        }}>
        {currentView
          ? props.data[currentCard].prompt
          : props.data[currentCard].response}
      </div>
      {/* back button */}
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
      {/* back button */}
      <Button
        variant='contained'
        onClick={() => {
          if (currentCard < props.data.length - 1) {
            setCurrentCard(currentCard + 1);
            setCurrentView(true);
          }
        }}>
        Next
      </Button>
    </div>
  );
};
