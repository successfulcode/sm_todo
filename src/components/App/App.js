import React, { Component } from 'react';
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry';
import Loyout from '../../hoc/Loyout';
import MainRoutes from '../../mainRoutes/MainRoutes';

class App extends Component {

  render() {
    return (
      <ErrorBoundry>
        <Loyout>
          <MainRoutes />
        </Loyout>
      </ErrorBoundry>
    )
  };

};

export default App;
