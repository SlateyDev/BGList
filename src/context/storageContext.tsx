import React, {createContext, useEffect, useState} from 'react';
import {GameDefinition} from '../interface/gameDefinition';
import AsyncStorage from '@react-native-community/async-storage';
import {openDatabase, Transaction} from 'react-native-sqlite-storage';
import migrations from './migrations';

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

const runMigrationCommands = (
  transaction: Transaction,
  migrationCommands: string[],
) => {
  if (migrationCommands.length > 0) {
    console.log('performing migration command:', migrationCommands[0]);
    transaction.executeSql(
      migrationCommands[0],
      [],
      () => {
        runMigrationCommands(transaction, migrationCommands.slice(1));
      },
      (_tx, error) => {
        console.log(error);
      },
    );
  }
};

const runMigration = (
  transaction: Transaction,
  existingMigrations: string[],
) => {
  const migrationCommands = getMigrationCommands(existingMigrations);
  runMigrationCommands(transaction, migrationCommands);
};

const getMigrationCommands = (existingMigrations: string[]) => {
  let migrationCommandList: string[] = [];
  for (let migration of migrations) {
    if (existingMigrations.indexOf(migration.name) === -1) {
      console.log('migration required:', migration.name);
      migrationCommandList = [
        ...migrationCommandList,
        ...migration.up,
        `INSERT INTO migrations_history (MigrationId) VALUES ("${migration.name}")`,
      ];
    }
  }
  return migrationCommandList;
};

const db = openDatabase(
  {
    name: 'bglist.db',
    location: 'default',
  },
  () => {},
  e => console.log(e),
);

const migrateDb = async () => {
  return new Promise<void>((resolve, reject) => {
    // db.transaction(
    //   txn => {
    //     txn.executeSql(
    //       'SELECT name FROM sqlite_master WHERE type="table"',
    //       [],
    //       (_t, r) => {
    //         console.log(r.rows.length);
    //         console.log(r.rows.raw());
    //       },
    //       e => console.log(e),
    //     );
    //   },
    //   e => console.log('transaction error', e),
    //   () => console.log('success'),
    // );
    // db.executeSql("DROP TABLE migrations_history", [], () => {}, () => {});
    // db.executeSql("DROP TABLE game", [], () => {}, () => {});
    // return;

    db.transaction(
      txn => {
        txn.executeSql(
          'SELECT name FROM sqlite_master WHERE type="table" and name="migrations_history"',
          [],
          (_tx, result) => {
            if (result.rows.length === 0) {
              console.log('creating migrations table');
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS migrations_history (MigrationId TEXT PRIMARY KEY)',
                [],
                async (_t, _r) => {
                  runMigration(txn, []);
                },
                (_tx, e) => console.log('create failed', e),
              );
            } else {
              console.log('migrations table exists');
              txn.executeSql(
                'SELECT * FROM migrations_history',
                [],
                (_t, r) => {
                  runMigration(
                    txn,
                    r.rows.raw().map(migration => migration.MigrationId),
                  );
                },
                (_tx, e) => console.log('create failed', e),
              );
            }
          },
          e => console.log(e),
        );
      },
      transError => reject(transError),
      () => resolve(),
    );
  });
};

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
    async function startProviderActions() {
      console.log('performing migrations');
      await migrateDb();
      console.log('migration complete');

      console.log('getting items');
      await AsyncStorage.getItem('gameList', gameListCallback);
      await AsyncStorage.getItem('username', usernameCallback);
    }

    startProviderActions();
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
