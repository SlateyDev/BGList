import React, {createContext, useEffect, useState} from 'react';
import {GameDefinition} from '../interface/gameDefinition';
import AsyncStorage from '@react-native-community/async-storage';
import {AsyncQuery, CallbackQuery} from '../utils/sqlite';
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

async function AddGamesToDB(games: GameDefinition[]) {
  for (let game of games) {
    try {
      await AsyncQuery(
        'INSERT INTO game (objectId, collectionId, imageUri, name, numPlays, maxPlayers, maxPlaytime, minPlayers, minPlaytime, numOwned, playingTime, rating, average, bayesianAverage, median, standardDeviation, usersRated, forTrade, lastModified, own, preOrdered, previouslyOwned, want, wantToBuy, wantToPlay, wishlist, wishlistPriority, thumbnailUri, yearPublished) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          game.objectId,
          game.collectionId,
          game.imageUri,
          game.name,
          game.numPlays,
          game.maxPlayers,
          game.maxPlaytime,
          game.minPlayers,
          game.minPlaytime,
          game.numOwned,
          game.playingTime,
          game.rating,
          game.average,
          game.bayesianAverage,
          game.median,
          game.standardDeviation,
          game.usersRated,
          game.forTrade,
          game.lastModified,
          game.own,
          game.preOrdered,
          game.previouslyOwned,
          game.want,
          game.wantToBuy,
          game.wantToPlay,
          game.wishlist,
          game.wishlistPriority,
          game.thumbnailUri,
          game.yearPublished,
        ],
      );
    } catch (e) {
      console.log('error:', e.message);
    }
  }
}

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
      CallbackQuery('SELECT * FROM game', [], gameListCallback);
      await AsyncStorage.getItem('username', usernameCallback);
    }

    startProviderActions();
  }, []);

  const updateGameList = async (newGameList: GameDefinition[]) => {
    await AddGamesToDB(newGameList);
    setGameList(newGameList);
  };

  return (
    <StorageContext.Provider
      value={{gameList, updateGameList, username, updateUsername}}>
      {children}
    </StorageContext.Provider>
  );
};
