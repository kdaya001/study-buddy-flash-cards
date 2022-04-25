import { Button, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { ApplicationContext } from '../../app-context';
import styles from './Cards.module.css';

export const Cards = ({ tag, data, rnd }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);
  const [flip, setFlip] = useState<boolean>(false);
  const [appState, appAction] = useContext(ApplicationContext);

  return (
    <div>
      {/* Heading for topic */}
      <h1 className={styles.cardHeading}>{tag}</h1>
      {currentCard === data.length - 1 && (
        <h1 className={styles.end}>You've reached the end, choose another topic</h1>
      )}
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        {/* back button */}
        <Button
          variant='contained'
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
              setCurrentView(true);
              setFlip(false);
            }
          }}>
          {`<`}
        </Button>
        {/* card itself allows front and back*/}
        <div
          className={`${styles.cardContainer} ${styles.card} ${flip ? styles.flip : ''} ${appState.theme === 'dark' ? styles.cardDark : ''}`}
          onClick={(e) => {
            setCurrentView(!currentView);
            setFlip(!flip);
          }}>
          {currentView && (
            <div className={styles.front}>
              <h2>Prompt</h2>
              <p>{data[rnd[currentCard]].prompt}</p>
              {data[rnd[currentCard]]?.hint && (
                <p>{data[rnd[currentCard]].response}</p>
              )}
            </div>
          )}
          {!currentView && (
            <div className={styles.back}>
              <h2>Answer</h2>
              <p>{data[rnd[currentCard]].response}</p>
            </div>
          )}
        </div>
        {/* back button */}
        <Button
          variant='contained'
          onClick={() => {
            if (currentCard < data.length - 1) {
              setCurrentCard(currentCard + 1);
              setCurrentView(true);
              setFlip(false);
            }
          }}>
          {`>`}
        </Button>
      </Stack>
      <Stack
        className={styles.cardFlipContainer}
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        <Button
          variant='contained'
          onClick={() => {
            setCurrentView(!currentView);
            setFlip(!flip);
          }}>
          {!flip ? 'Show Answer' : 'Show Prompt'}
        </Button>
      </Stack>
    </div>
  );
};
