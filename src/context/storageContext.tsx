import React, {createContext, useEffect, useState} from 'react';
import {GameDefinition} from '../interface/gameDefinition';
import AsyncStorage from '@react-native-community/async-storage';
import {AddRange, Query} from '../utils/sqlite';
import {migrateDb} from '../utils/sqliteMigration';

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

  const gameListCallback = (storageGameList: GameDefinition[] | undefined) => {
    if (storageGameList) {
      setGameList(storageGameList);
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
    async function startProviderActions() {
      console.log('performing migrations');
      await migrateDb();
      console.log('migration complete');

      console.log('getting items');
      Query('SELECT * FROM game', [], gameListCallback);
      await AsyncStorage.getItem('username', usernameCallback);
    }

    startProviderActions();
  }, []);

  const updateGameList = async (newGameList: GameDefinition[]) => {
    await AddRange('game', newGameList);
    setGameList(newGameList);
  };

  return (
    <StorageContext.Provider
      value={{gameList, updateGameList, username, updateUsername}}>
      {children}
    </StorageContext.Provider>
  );
};
