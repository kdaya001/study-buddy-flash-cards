import { Button } from '@mui/material';
import { useState } from 'react';
import './card.css';

export const Card = ({ viewCardAmount, tag }: any) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [currentView, setCurrentView] = useState<boolean>(true);

  const data: any = {
    Algorithms: [
      {
        prompt: 'prompt1',
        response: 'answer1',
      },
      {
        prompt: 'prompt2',
        response: 'answer2',
      },
      {
        prompt: 'prompt3',
        response: 'answer3',
      },
      {
        prompt: 'prompt4',
        response: 'answer4',
      },
      {
        prompt: 'prompt5',
        response: 'answer5',
      },
      {
        prompt: 'prompt6',
        response: 'answer6',
      },
      {
        prompt: 'prompt7',
        response: 'answer7',
      },
      {
        prompt: 'prompt8',
        response: 'answer8',
      },
      {
        prompt: 'prompt9',
        response: 'answer9',
      },
      {
        prompt: 'prompt10',
        response: 'answer10',
      },
    ],
  };

  console.log(data[tag][currentCard]);

  return (
    <div>
      <div
        className='card_card-container'
        onClick={() => {
          setCurrentView(!currentView);
        }}>
          <div className="card_card-content">
        {currentView
          ? data[tag][currentCard].prompt
          : data[tag][currentCard].response}
          </div>
      </div>

      <Button
        variant='contained'
        onClick={() => {
          if (currentCard < viewCardAmount - 1) {
            setCurrentCard(currentCard + 1);
          }
        }}>
        Next
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
          }
        }}>
        Back
      </Button>
    </div>
  );
};
