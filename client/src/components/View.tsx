import { useState } from "react";
import { Card } from "./Card";
import { SetCardView } from './SetCardView';
import { SetTag } from "./SetTag";

export const View = () => {
  const [viewCardAmount, setViewCardAmount] = useState<Number>(10);
  const [tag, setTag] = useState<String>('Algorithms');
  
  return (
    <div>
      <SetCardView viewCardAmount={viewCardAmount} setViewCardAmount={setViewCardAmount}/>
      <SetTag tag={tag} setTag={setTag}/>
      <Card viewCardAmount={viewCardAmount} tag={tag} />
    </div>
  )
}