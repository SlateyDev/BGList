import {openDatabase} from 'react-native-sqlite-storage';

export const sqlite_db = openDatabase(
  {
    name: 'bglist.db',
    location: 'default',
  },
  () => {},
  e => console.log(e),
);

export async function AsyncQuery<T>(
  query: string,
  args: any[] = [],
): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    sqlite_db.transaction(
      tx => {
        tx.executeSql(query, args, (_tx, res) => {
          resolve(res.rows.raw());
        });
      },
      txError => {
        reject(txError);
      },
    );
  });
}

export function CallbackQuery<T>(
  query: string,
  args: any[] = [],
  successCallback: (data: T[]) => void,
): void {
  sqlite_db.transaction(tx => {
    tx.executeSql(
      query,
      args,
      (_tx, res) => {
        successCallback(res.rows.raw());
      },
      (_tx, error) => {
        console.log('CallbackQuery error:', error);
      },
    );
  });
}
