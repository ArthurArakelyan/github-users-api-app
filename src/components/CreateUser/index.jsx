import React from 'react';

import styles from './CreateUser.module.css';

const CreateUser = ({ userCreate }) => {
  return (
    <div className={styles.create}>
      <h2 className={styles.create__heading}>Add New User</h2>

      <button
        className={styles.create__user}
        onClick={userCreate}
      >+</button>
    </div>
  );
}

export default CreateUser;
