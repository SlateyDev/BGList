import React from 'react';

import {LoginProvider} from './context/loginContext';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <LoginProvider>
      <Navigation />
    </LoginProvider>
  );
};

export default App;
