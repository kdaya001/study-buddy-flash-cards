import { useState } from 'react';


export const Cards = (props: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);

  /**
   * passed in cards array
   * card renders each card and allows going forward or backward
   *
   * props:
   *  * data
   *
   * data format:
   * {
   *  prompt: "",
   *  response: "",
   * }
   */

  return (
    <div>
      {/* Heading for topic */}
      <h1>{props.tag}</h1>
      {/* card itself allows front and back*/}
      <div
        className='card_card-container'
        onClick={() => {
          setCurrentView(!currentView);
        }}>
        {currentView
          ? props.data[currentCard].prompt
          : props.data[currentCard].response}
      </div>
      {/* next button */}
      {/* back button */}
    </div>
  );
};
