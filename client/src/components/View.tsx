import { useState } from "react";
import { Card } from "./Card";
import { SetCardView } from './SetCardView';
import { UpdateTag } from "./UpdateTag";

export const View = () => {
  const [viewCardAmount, setViewCardAmount] = useState<Number>(10);
  const [tag, setTag] = useState<String>("Algorithms");
  const [data, setData] = useState([{prompt: 'loading', response: 'loading'}]);
  
  return (
    <div> 
      <SetCardView viewCardAmount={viewCardAmount} setViewCardAmount={setViewCardAmount} data={data}/>
      <UpdateTag tag={tag} setTag={setTag}/>
      <Card viewCardAmount={viewCardAmount} tag={tag} setData={setData} data={data} />
    </div>
  )
}