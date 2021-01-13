import React from 'react';

import './styles.css';

class Spinner extends React.Component {
  render() {
    return (
      <div className="lds-css">
        <div className="lds-double-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};

export default Spinner;
