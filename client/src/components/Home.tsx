import { useContext } from "react";
import { ApplicationContext } from "../app-context";
import { ViewCards } from "./cards/ViewCards";

export const Home = ({start, setStart}:any) => {
  return (
    <div>
      <ViewCards start={start} setStart={setStart}/>
    </div>
  )
}