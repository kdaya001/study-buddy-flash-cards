import { BrowserRouter, Route, Routes } from "react-router-dom";
import { View } from './components/View';
import { Create } from './components/Create';
import Signin from './components/Signin';
import { NavBar } from './components/NavBar';
import SignUp from "./components/SignUp";
import { useEffect, useReducer } from "react";
import { ActionType, ApplicationContextReducer, DefaultApplicationState } from "./app-context";
import axios from "axios";



// async function getSession() {
//   await axios.get("/api/session").then((res) => {

//   }
//   // return {
//   //     name: "",
//   // };
// }

function App() {
  const [appState, appAction] = useReducer(
    ApplicationContextReducer,
    DefaultApplicationState
);

// useEffect(() => {
//   getSession().then((user) => {
//       if (user) {
//           appAction({
//               type: ActionType.LOGIN,
//               payload: {
//                   user: user,
//               },
//           });
//       }
//   });
// }, []);

  return (
    <BrowserRouter>
      <h1>Study Buddy</h1>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<View />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
