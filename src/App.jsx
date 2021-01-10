import React, { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';

import User from './components/User';
import CreateUser from './components/CreateUser';
import Modal from './components/common/Modal';

const App = () => {
  const [users, setUsers] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [creatingUser, setCreatingUser] = useState({});
  const [edittingUser, setEdittingUser] = useState({});

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(users => setUsers(users));
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

  const userCreate = () => {
    setCreatingUser({
      id: nanoid(),
      login: '',
      type: 'User',
      avatar_url: ''
    });

    setModalType('create');
    setModalIsOpen(true);
  }

  const creatingValueChange = (e) => {
    setCreatingUser((user) => {
      return {
        ...user,
        login: e.target.value
      }
    });
  }

  const creatingTypeChange = (e) => {
    setCreatingUser((user) => {
      return {
        ...user,
        type: e.target.value
      }
    });
  }

  const creatingAvatarUrlChange = (e) => {
    setCreatingUser((user) => {
      return {
        ...user,
        avatar_url: e.target.value
      }
    });
  }

  const creatingUserSubmit = (e) => {
    e.preventDefault();
    setUsers((user) => {
      return [creatingUser, ...user];
    });

    setModalIsOpen(false);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="users">
          <CreateUser 
            userCreate={userCreate}
          />

          {users ? users.map(user => {
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
            )
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
          creatingUser={creatingUser}
          creatingValueChange={creatingValueChange}
          creatingTypeChange={creatingTypeChange}
          creatingAvatarUrlChange={creatingAvatarUrlChange}
          creatingUserSubmit={creatingUserSubmit}
        />
      </div>
    </div>
  );
}

export default App;
