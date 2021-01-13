import React from 'react';
import {Route} from 'react-router-dom';

import Users from './components/Users';
import UserInfo from './components/UserInfo';

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Route exact path="/" component={Users} />

        <Route path="/:id" render={({match}) => {
          return <UserInfo name={match.params.id} />;
        }} />
      </div>
    </div>
  );
}

export default App;
