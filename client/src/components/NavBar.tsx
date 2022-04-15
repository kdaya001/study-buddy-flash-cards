import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/my-cards">My Cards</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}