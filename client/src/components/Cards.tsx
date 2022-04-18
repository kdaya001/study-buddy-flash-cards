import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import './cards.css';

export const Cards = ({ tag, data, rnd }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);

  return (
    <div>
      {/* Heading for topic */}
      <h1 className='card-heading'>{tag}</h1>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        {/* back button */}
        <Button
          className='card-next-button'
          variant='contained'
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
              setCurrentView(true);
            }
          }}>
          {`<`}
        </Button>
        {/* card itself allows front and back*/}
        <div
          className='card_card-container'
          onClick={() => {
            setCurrentView(!currentView);
          }}>
          {currentView && (
            <>
              <h2>Prompt</h2>
              <p>{data[rnd[currentCard]].prompt}</p>
              {data[rnd[currentCard]]?.hint && (
                <p>{data[rnd[currentCard]].response}</p>
              )}
            </>
          )}
          {!currentView && (
            <>
              <h2>Response</h2>
              <p>{data[rnd[currentCard]].response}</p>
            </>
          )}
        </div>
        {/* back button */}
        <Button
          className='card-back-button'
          variant='contained'
          onClick={() => {
            if (currentCard < data.length - 1) {
              setCurrentCard(currentCard + 1);
              setCurrentView(true);
            }
          }}>
          {`<`}
        </Button>
      </Stack>
      <Stack
        className="card_flip-container"
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        <Button
          className='card-back-button'
          variant='contained'
          onClick={() => {
            setCurrentView(!currentView);
          }}>
          Flip
        </Button>
      </Stack>
    </div>
  );
};
