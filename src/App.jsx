import React, { useEffect, useState } from 'react';
// import {nanoid} from 'nanoid';

import User from './components/User';
import CreateUser from './components/CreateUser';
import Modal from './components/common/Modal';

const App = () => {
  const [users, setUsers] = useState(null);
  const [edittingUser, setEdittingUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [usernamePlaceholder, setUsernamePlaceholder] = useState('Enter Username...');
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(users => setUsers(users.slice(0, 3)));
  }, []);

  const userDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }

  const userEdit = (id) => {
    setEdittingUser(users.find(user => id === user.id));
    setModalIsOpen(true);
    setModalType('edit');
  }

  const edittingValueChange = (e) => {
    setEdittingUser((user) => {
      return {
        ...user,
        login: e.target.value
      }
    });
  }

  const edittingModalSubmit = (e) => {
    e.preventDefault();
    const newUsers = users.map(user => user.id === edittingUser.id ? !edittingUser.login ? user : edittingUser : user);

    setUsers(newUsers);
    setModalIsOpen(false);
  }

  const edittingUserTypeChange = (e) => {
    setEdittingUser((user) => {
      return {
        ...user,
        type: e.target.value
      }
    });
  }

  const edittingUserAvatarChange = (e) => {
    setEdittingUser((user) => {
      return {
        ...user,
        avatar_url: e.target.value
      }
    });
  }

  const newUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setUsernamePlaceholder('Enter Username...');
  }

  const newUserSubmit = async (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      fetch(`https://api.github.com/users/${newUsername}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Could not fetch, received ${res.status}`);
          }

          return res.json();
        })
        .then(user => {
          const checkedUsers = users.filter(item => {
            if (item.login === user.login) {
              return;
            }

            return item;
          });

          setUsers([user, ...checkedUsers]);
          setError(false);
          setNewUsername('');
          setModalIsOpen(false);
        })
        .catch(() => {
          setError(true);
          setUsernamePlaceholder('User is not found');
          setNewUsername('');
        });
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="users">
          <CreateUser
            userCreate={() => {
              setModalType('create');
              setModalIsOpen(true);
            }}
          />

          {users ? users.map(user => {
            if (user) {
              return (
                <User
                  key={user.id}
                  id={user.id}
                  name={user.login}
                  type={user.type}
                  avatarUrl={user.avatar_url}
                  userDelete={userDelete}
                  userEdit={userEdit}
                />
              );
            }

            return null;
          }) : null}
        </div>

        <Modal
          modalIsOpen={modalIsOpen}
          modalType={modalType}
          modalClose={() => setModalIsOpen(false)}
          edittingUser={edittingUser}
          edittingValueChange={edittingValueChange}
          edittingModalSubmit={edittingModalSubmit}
          edittingUserTypeChange={edittingUserTypeChange}
          edittingUserAvatarChange={edittingUserAvatarChange}
          newUsername={newUsername}
          usernamePlaceholder={usernamePlaceholder}
          newUsernameChange={newUsernameChange}
          newUserSubmit={newUserSubmit}
        />
      </div>
    </div>
  );
}

export default App;
