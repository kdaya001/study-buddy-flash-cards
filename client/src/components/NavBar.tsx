import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom"
import { ActionType, ApplicationContext } from "../app-context";

export const NavBar = ({setStart}:any) => {
  const [appState, appAction] = useContext(ApplicationContext);

  const handleLogout = () => {
    axios.delete('/api/sessions/').then(() => {
      appAction({
        type: ActionType.LOGOUT,
    });
  })
}
  
  return (
    <div>
      <Link to="/" onClick={() => {
        setStart(false);
      }}>Home</Link>
      {!appState.currentUser && <Link to="/login">Login</Link>}
      {!appState.currentUser && <Link to="/signup">Sign Up</Link>}
      {appState.currentUser && <Link to="/create">Create</Link>}
      {appState.currentUser && <Link to="/" onClick={handleLogout}>Logout</Link>}
    </div>
  )
}