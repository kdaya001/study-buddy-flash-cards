import { Button, CircularProgress, LinearProgress, Stack } from '@mui/material';
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
        if (res.data.length > 0) {
          setCardData(res.data[0].cards);
          setTag(res.data[0].tag);
          setRnd(res.data[0]?.cards.length);
          setStart(true);
          setLoading(false);
        }
      });
    }
  }, [selection]);

  const setRnd = (len: number) => {
    let rndArr: number[] = [];
    while (rndArr.length < len) {
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
      return {
        id: tag._id,
        tag: tag.tag,
        total: tag.cards.length,
      };
    });
    setRows(rowData);
    setLoading(false);
  }, [allTags]);

  return (
    <div>
      {!start && (
        <>
          <h1>Pick your poison</h1>
          {rows.length <= 0 && <LinearProgress />}
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
                      <Button
                        className={
                          appState.theme === 'dark' ? styles.darkbutton : ''
                        }
                        id={row.id}
                        variant='contained'
                        onClick={(e: any) => {
                          setLoading(true);
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
          {loading && (
            <Stack
              sx={{ color: 'grey.500' }}
              className={styles.loading}
              spacing={2}
              direction='row'>
              <CircularProgress color='secondary' />
            </Stack>
          )}
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
