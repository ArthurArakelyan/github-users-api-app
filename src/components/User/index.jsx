import React from 'react';

import styles from './User.module.css';

const User = ({ id, name, type, avatarUrl, userDelete, userEdit }) => {
  return (
    <div className={styles.user}>
      <h2 className={styles.user__name}>Name: {name}</h2>
      <p className={styles.user__type}>Type: {type}</p>

      <a href={`https://github.com/${name}`} target="_blank" className={styles.user__link}>
        <img src={avatarUrl} alt="User" className={styles.user__img} />
      </a>

      <div className={styles.user__actions}>
        <button
          className={`${styles.user__action} ${styles.user__edit}`}
          onClick={() => userEdit(id)}
        >
          Edit
        </button>
        <button
          className={`${styles.user__action} ${styles.user__remove}`}
          onClick={() => userDelete(id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default User;
