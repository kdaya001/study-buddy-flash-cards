import { BrowserRouter, Route, Routes } from "react-router-dom";
import { View } from './components/View';
import { Create } from './components/Create';
import Signin from './components/Signin';
import { NavBar } from './components/NavBar';
import SignUp from "./components/SignUp";




function App() {
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
