import React from 'react';

import styles from './CreateUser.module.css';

const CreateUser = ({ userCreate, deleteAllUsers }) => {
  return (
    <div className={styles.create}>
      <h2 className={styles.create__heading}>Add New User</h2>

      <button
        className={styles.create__user}
        onClick={userCreate}
      >+</button>

      <div className={styles.user__delete_all}>
        <button onClick={deleteAllUsers}>Delete All</button>
      </div>
    </div>
  );
}

export default CreateUser;
