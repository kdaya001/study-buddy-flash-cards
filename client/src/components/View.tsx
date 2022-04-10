import { useState } from "react";
import { Card } from "./Card"

export const View = () => {
  const [viewCardAmount, setViewCardAmount] = useState<Number>(10);
  
  return (
    <div>
      <Card />
    </div>
  )
}