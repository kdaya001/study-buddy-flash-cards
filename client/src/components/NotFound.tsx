import './notfound.css';
const notFound = require('../assets/not-found.gif');

export const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <div className='not-found_container'>
        <img src={notFound} alt='....loading' />
      </div>
    </div>
  );
};
