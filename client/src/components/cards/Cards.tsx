import { Button, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { ApplicationContext } from '../../app-context';
import styles from './Cards.module.css';

export const Cards = ({ tag, data, rnd }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);
  const [flip, setFlip] = useState<boolean>(false);
  const [appState, appAction] = useContext(ApplicationContext);
  const [count, setCount] = useState<number>(1);

  return (
    <div>
      {/* Heading for topic */}
      <h1 className={styles.cardHeading}>{tag}</h1>
      {currentCard === data.length - 1 && (
        <h1 className={styles.end}>
          You've reached the end, choose another topic
        </h1>
      )}
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        {/* back button */}
        <Button
          className={appState.theme === 'dark' ? styles.darkbutton : ''}
          variant='contained'
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
              setCurrentView(true);
              setFlip(false);
              setCount(count - 1);
            }
          }}>
          {`<`}
        </Button>
        {/* card itself allows front and back*/}
        <div
          className={`${styles.cardContainer} ${styles.card} ${
            flip ? styles.flip : ''
          } ${appState.theme === 'dark' ? styles.cardDark : ''}`}
          onClick={(e) => {
            setCurrentView(!currentView);
            setFlip(!flip);
          }}>
          {currentView && (
            <div className={styles.front}>
              <h2>Prompt</h2>
              <p>{data[rnd[currentCard]].prompt}</p>
              <h5 className={styles.cardNumber}>{count} </h5>
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
          className={appState.theme === 'dark' ? styles.darkbutton : ''}
          variant='contained'
          onClick={() => {
            if (currentCard < data.length - 1) {
              setCurrentCard(currentCard + 1);
              setCurrentView(true);
              setFlip(false);
              setCount(count + 1);
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
          className={appState.theme === 'dark' ? styles.darkbutton : ''}
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
