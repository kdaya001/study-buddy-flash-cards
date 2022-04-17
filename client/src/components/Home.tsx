import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../app-context";
import Signin from "./Signin";
import { ViewCards } from "./ViewCards";

export const Home = ({start, setStart}:any) => {
  const [appState, appAction] = useContext(ApplicationContext);

  return (
    <div>
      <ViewCards start={start} setStart={setStart}/>
    </div>
  )
}