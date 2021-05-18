import React, {createContext, useEffect, useState} from 'react';
import {GameDefinition} from '../interface/gameDefinition';
import AsyncStorage from '@react-native-community/async-storage';

type StorageContextProps = {
  gameList: GameDefinition[];
  updateGameList: (newGameList: GameDefinition[]) => void;
  username: string;
  updateUsername: (newUsername: string) => void;
};

export const StorageContext = createContext<StorageContextProps>({
  gameList: [],
  updateGameList: () => {},
  username: '',
  updateUsername: () => {},
});

export const StorageProvider: React.FC = ({children}) => {
  const [username, setUsername] = useState<string>('');
  const [gameList, setGameList] = useState<GameDefinition[]>([]);

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

  const updateGameList = (newGameList: GameDefinition[]) => {
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
