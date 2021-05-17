import React, {createContext, useEffect, useState} from 'react';
import {BggGameListDefinition} from '../interface/bggGameListDefinition';
import AsyncStorage from '@react-native-community/async-storage';

const initialGameList: BggGameListDefinition = {
  totalItems: 0,
  items: [],
};

type StorageContextProps = {
  gameList: BggGameListDefinition;
  updateGameList: (newGameList: BggGameListDefinition) => void;
  username: string;
  updateUsername: (newUsername: string) => void;
};

export const StorageContext = createContext<StorageContextProps>({
  gameList: initialGameList,
  updateGameList: () => {},
  username: '',
  updateUsername: () => {},
});

export const StorageProvider: React.FC = ({children}) => {
  const [username, setUsername] = useState<string>('');
  const [gameList, setGameList] =
    useState<BggGameListDefinition>(initialGameList);

  const gameListCallback = (
    error: Error | undefined,
    storageGameList: string | undefined,
  ) => {
    if (storageGameList) {
      setGameList(JSON.parse(storageGameList));
    }
  };

  const usernameCallback = (
    error: Error | undefined,
    storageUsername: string | undefined,
  ) => {
    if (storageUsername) {
      setUsername(storageUsername);
    }
  };

  const updateUsername = (newUsername: string) => {
    AsyncStorage.setItem('username', newUsername);
    setUsername(newUsername);
  };

  useEffect(() => {
    console.log('getting items');
    AsyncStorage.getItem('gameList', gameListCallback);
    AsyncStorage.getItem('username', usernameCallback);
  }, []);

  const updateGameList = (newGameList: BggGameListDefinition) => {
    AsyncStorage.setItem('gameList', JSON.stringify(newGameList));
    setGameList(newGameList);
  };

  return (
    <StorageContext.Provider
      value={{gameList, updateGameList, username, updateUsername}}>
      {children}
    </StorageContext.Provider>
  );
};
