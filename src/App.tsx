import React from 'react';

import {LoginProvider} from './context/loginContext';
import Navigation from './components/Navigation';
import {StorageProvider} from './context/storageContext';

const App = () => {
  return (
    <LoginProvider>
      <StorageProvider>
        <Navigation />
      </StorageProvider>
    </LoginProvider>
  );
};

export default App;
