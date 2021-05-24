import {Transaction} from 'react-native-sqlite-storage';
import migrations from './migrations';
import {sqlite_db} from './sqlite';

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

export const migrateDb = async () => {
  return new Promise<void>((resolve, reject) => {
    // sqlite_db.transaction(
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
    // sqlite_db.executeSql("DROP TABLE migrations_history", [], () => {}, () => {});
    // sqlite_db.executeSql("DROP TABLE game", [], () => {}, () => {});
    // return;

    sqlite_db.transaction(
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
