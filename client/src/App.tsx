import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { View } from './components/backup/View';
import { Create } from './components/Create';
import Signin from './components/Signin';
import { NavBar } from './components/NavBar';
import SignUp from './components/SignUp';
import { useEffect, useReducer } from 'react';
import {
  ActionType,
  ApplicationContext,
  ApplicationContextReducer,
  DefaultApplicationState,
} from './app-context';
import { getSession } from './helper/getSession';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';

function App() {
  const [appState, appAction] = useReducer(
    ApplicationContextReducer,
    DefaultApplicationState
  );

  useEffect(() => {
    getSession().then((user: any) => {
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
        <h1>Study Buddy</h1>
        <NavBar />
        <Routes>
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          {appState.currentUser && <Route path='/create' element={<Create />} />}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApplicationContext.Provider>
  );
}

export default App;
