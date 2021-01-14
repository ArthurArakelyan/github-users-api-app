import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../common/Spinner';

import styles from './UserInfo.module.css';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then(res => res.json())
      .then(user => setUser(user));
  }, [id]);

  if (user) {
    if (user.login) {
      return (
        <div className={styles.user__info}>
          <Link to="/" className={styles.user__info_back}>&#x2190;</Link>

          <div className={styles.user__info_img_container}>
            <img className={styles.user__info_img} src={user.avatar_url} alt="User" />

            <div className={styles.user__info__followers_container}>
              <span className={styles.user__info_followers}>Followers: {user.followers}</span>
              <span className={styles.user__info_following}>Following: {user.following}</span>
            </div>
          </div>

          <div className={styles.user__info_container}>
            <h2 className={styles.user__info_login}>{user.login}</h2>
            {user.name ? <h3 className={styles.user__info_name}>{user.name}</h3> : null}
            <p className={styles.user__info_id}>ID: {user.id}</p>
            <p className={styles.user__info_type}>Type: {user.type}</p>
            {user.location ? <p className={styles.user__info_location}>Location: {user.location}</p> : null}

            <a
              className={styles.user__info_link}
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              Link to Account
            </a>
          </div>
        </div>
      );
    } else if (user.message) {
      return (
        <div className={styles.user__info}>
          <Link to="/" className={styles.user__info_back}>&#x2190;</Link>
          <h2>User not found</h2>
        </div>
      );
    }
  }

  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );
}

export default UserInfo;
