import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <div className={styles.notFoundContainer}>
        <img src={require('../assets/not-found.gif')} alt='....loading' />
      </div>
    </div>
  );
};
