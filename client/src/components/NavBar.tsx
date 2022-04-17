import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom"
import { ActionType, ApplicationContext } from "../app-context";

export const NavBar = () => {
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
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      {appState.currentUser && <Link to="/create">Create</Link>}
      {appState.currentUser && <Link to="/" onClick={handleLogout}>Logout</Link>}
    </div>
  )
}