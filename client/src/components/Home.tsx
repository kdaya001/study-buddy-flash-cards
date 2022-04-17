import { useContext } from "react";
import { ApplicationContext } from "../app-context";
import Signin from "./Signin";
import { ViewCards } from "./ViewCards";

export const Home = () => {
  const [appState, appAction] = useContext(ApplicationContext);

  return (
    <div>
      <ViewCards />
    </div>
  )
}