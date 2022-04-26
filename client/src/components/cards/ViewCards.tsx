import { Button, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../app-context';
import { Cards } from './Cards';
import styles from './ViewCards.module.css';

export const ViewCards = ({ start, setStart }: any) => {
  const [publicTags, setPublicTags] = useState<any>([]);
  const [privateTags, setPrivateTags] = useState<any>([]);
  const [allTags, setAllTags] = useState<any>([]);
  const [appState, appAction] = useContext(ApplicationContext);
  const [rows, setRows] = useState<any>([]);
  const [selection, setSelection] = useState<string | null>(null);
  const [cardData, setCardData] = useState<any>([]);
  const [viewCardAmount, setViewCardAmount] = useState<Number>(0);
  const [viewCardArr, setViewCardArr] = useState<any>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //Get data on start
  useEffect(() => {
    if (selection) {
      axios.get(`/api/cards/get/${selection}`).then((res) => {
        if (res.data.length > 0 && viewCardAmount > 0) {
          setLoading(true);
          setCardData(res.data[0].cards);
          setTag(res.data[0].tag);
          setRnd(res.data[0]?.cards.length);
          setStart(true);
        }
      });
    }
  }, [selection]);

  useEffect(() => {
    if(!start) {
      setLoading(false);
    }
  }, [start])

  const setRnd = (len: number) => {
    let rndArr: number[] = [];
    while (rndArr.length < viewCardAmount) {
      let rnd = Math.floor(Math.random() * len);
      if (!rndArr.includes(rnd)) {
        rndArr.push(rnd);
      }
    }
    setViewCardArr(rndArr);
  };

  // Get public tags
  useEffect(() => {
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

  useEffect(() => {
    const rowData = allTags.map((tag: any) => {
      const options = getOptions(tag.cards);
      return {
        id: tag._id,
        tag: tag.tag,
        total: tag.cards.length,
        options: options,
      };
    });
    setRows(rowData);
    setLoading(false);
  }, [allTags]);

  const getOptions = (cards: any) => {
    const options = [];
    if (cards.length > 0 && cards.length < 10) {
      options.push(cards.length);
    } else if (cards.length >= 10) {
      let count = 0;
      for (let i = 10; i <= cards.length; i += 10) {
        options.push(i);
        count++;
      }
    }
    return options;
  };

  return (
    <div>
      {!start && (
        <>
          <h1>Pick your poison</h1>
          {loading && (
            <Stack
              sx={{ color: 'grey.500' }}
              className={styles.loading}
              spacing={2}
              direction='row'>
              <CircularProgress color='secondary' />
            </Stack>
          )}
          <table className={styles.styledTable}>
            <thead>
              <tr
                className={
                  appState.theme === 'dark'
                    ? styles.tableHeadDark
                    : styles.trTHeadStyled
                }>
                <th>Topic</th>
                <th>Total Cards</th>
                <th></th>
                <th>Start</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any) => {
                return (
                  <tr className={styles.trTBodyStyled} key={row.id}>
                    <td>{row.tag}</td>
                    <td>{row.total}</td>
                    <td>
                      <select
                        name='options'
                        id='options'
                        defaultValue={'choose'}
                        className={styles.option}
                        onChange={(event) =>
                          setViewCardAmount(parseInt(event?.target.value))
                        }>
                        <option value='choose' disabled>
                          Choose
                        </option>
                        {row.options.map((option: any) => {
                          return (
                            <option id={row.tag} key={option} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>
                      <Button
                        className={
                          appState.theme === 'dark' ? styles.darkbutton : ''
                        }
                        id={row.id}
                        variant='contained'
                        onClick={(e: any) => {
                          setSelection(e.target.id);
                        }}>
                        Start
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {start && (
        <>
          <Cards
            data={cardData}
            tag={tag}
            amount={viewCardAmount}
            rnd={viewCardArr}
          />
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}>
            <Button
              className={appState.theme === 'dark' ? styles.darkbutton : ''}
              onClick={() => {
                setStart(false);
                setViewCardAmount(0);
                setCardData([]);
              }}
              type='submit'
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Choose another topic
            </Button>
          </Stack>
        </>
      )}
    </div>
  );
};
