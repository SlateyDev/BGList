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
};

export const StorageContext = createContext<StorageContextProps>({
  gameList: initialGameList,
  updateGameList: () => {},
});

export const StorageProvider: React.FC = ({children}) => {
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

  useEffect(() => {
    console.log('getting items');
    AsyncStorage.getItem('gameList', gameListCallback);
  }, []);

  const updateGameList = (newGameList: BggGameListDefinition) =>
    AsyncStorage.setItem('gameList', JSON.stringify(newGameList));

  return (
    <StorageContext.Provider value={{gameList, updateGameList}}>
      {children}
    </StorageContext.Provider>
  );
};
