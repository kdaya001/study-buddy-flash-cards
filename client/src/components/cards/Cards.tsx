import { Button, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../app-context';
import styles from './Cards.module.css';

export const Cards = ({ tag, data, rnd }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);
  const [flip, setFlip] = useState<boolean>(false);
  const [appState, appAction] = useContext(ApplicationContext);
  const [count, setCount] = useState<number>(1);
  const [viewCardAmount, setViewCardAmount] = useState<number>(0);
  const [changeViewStatus, setChangeViewStatus] = useState<boolean>(false);

  const getOptions = (cards: any) => {
    const options = [];
    if (cards.length > 0 && cards.length < 10) {
      options.push(cards.length);
    } else if (cards.length >= 10) {
      for (let i = 10; i <= cards.length; i += 10) {
        options.push(i);
      }
    }
    return options;
  };

  const options = getOptions(data);

  useEffect(() => {
    setViewCardAmount(data.length);
  }, []);

  useEffect(() => {
    if (count === 2) {
      setChangeViewStatus(true);
    }
  }, [count]);

  return (
    <div>
      {/* Heading for topic */}
      <h1 className={styles.cardHeading}>{tag}</h1>
      {currentCard === viewCardAmount - 1 && (
        <h1 className={styles.end}>
          You've reached the end, choose another topic
        </h1>
      )}
      <div>
        <div className={styles.input}>
          {!changeViewStatus && <select
            name='options'
            id='options'
            defaultValue={'choose'}
            className={styles.option}
            onChange={(event) => {
              setViewCardAmount(parseInt(event?.target.value));
              setChangeViewStatus(true);
            }}
            disabled={changeViewStatus}>
            <option value='choose' disabled>
              Choose
            </option>
            {options.map((option: any) => {
              return (
                <option id={tag} key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>}
        </div>
      </div>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}>
        {/* back button */}
        <Button
          className={appState.theme === 'dark' ? styles.darkbutton : styles.lightbutton}
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
          } ${appState.theme === 'dark' ? styles.cardDark : styles.cardLight}`}
          onClick={(e) => {
            setCurrentView(!currentView);
            setFlip(!flip);
          }}>
          {currentView && (
            <div className={styles.front}>
              <h2 className={styles.prompt}>Prompt</h2>
              <p>{data[rnd[currentCard]].prompt}</p>
              <h5 className={styles.cardNumber}>{count} </h5>
            </div>
          )}
          {!currentView && (
            <div className={styles.back}>
              <h2 className={styles.answer}>Answer</h2>
              <p>{data[rnd[currentCard]].response}</p>
            </div>
          )}
        </div>
        {/* back button */}
        <Button
          className={appState.theme === 'dark' ? styles.darkbutton : styles.lightbutton}
          variant='contained'
          onClick={() => {
            if (currentCard < viewCardAmount - 1) {
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
          className={appState.theme === 'dark' ? styles.darkbutton : styles.lightbutton}
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
