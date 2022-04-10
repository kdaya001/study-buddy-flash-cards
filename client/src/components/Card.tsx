export const Card = () => {
  const data = {
    Algorithms: [
      {
        prompt: 'prompt',
        response: 'answer',
      },
      {
        prompt: 'prompt',
        response: 'answer',
      },
    ],
  };

  return (
    <div>
      {data.Algorithms.map((item):any => {
        return (
          <div>
            <p>{item.prompt}</p>
            <p>{item.response}</p>
          </div>
        );
      })}
    </div>
  )
};
