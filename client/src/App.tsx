import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Create } from './components/cards/Create';
import Signin from './components/profile/Signin';
import SignUp from './components/profile/SignUp';
import { useEffect, useReducer, useState } from 'react';
import {
  ActionType,
  ApplicationContext,
  ApplicationContextReducer,
  DefaultApplicationState,
} from './app-context';
import { getSession } from './helper/getSession';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import { Update } from './components/cards/Update';
import styles from './App.module.css';

type UserProps = {
  email: string;
};

function App() {
  const [appState, appAction] = useReducer(
    ApplicationContextReducer,
    DefaultApplicationState
  );
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    getSession().then((user: UserProps) => {
      if (user) {
        appAction({
          type: ActionType.LOGIN,
          payload: {
            user: user,
          },
        });
      }
    });
  }, []);

  return (
    <ApplicationContext.Provider value={[appState, appAction]}>
      <BrowserRouter>
        <div className={appState.theme === 'dark' ? styles.dark : ''}>
          <Nav setStart={setStart} />
          <Routes>
            <Route path='/login' element={<Signin />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/'
              element={<Home start={start} setStart={setStart} />}
            />
            {appState.currentUser && (
              <Route path='/create' element={<Create />} />
            )}
            <Route path='/update' element={<Update />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApplicationContext.Provider>
  );
}

export default App;
