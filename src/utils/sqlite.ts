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

export function Query<T>(
  query: string,
  args: any[] = [],
  successCallback: (data: T[]) => void,
): void {
  sqlite_db.transaction(
    tx => {
      tx.executeSql(query, args, (_tx, res) => {
        successCallback(res.rows.raw());
      });
    },
    txError => {
      console.log('Query error:', txError);
    },
  );
}

function* getDataKeys(obj: any) {
  for (const objKey in obj) {
    if (typeof obj[objKey] === 'object') {
      if (!(obj[objKey] instanceof Date) && obj[objKey] !== null) {
        continue;
      }
    }
    yield {
      key: objKey,
      value:
        obj[objKey] instanceof Date ? obj[objKey].toDateString() : obj[objKey],
    };
  }
}

export async function AddRange(table: string, data: any[]) {
  for (let record of data) {
    const fields = Array.from(getDataKeys(record));
    const keys = fields.map(field => field.key).join(',');
    const params = fields.map(_field => '?').join(',');
    const sql = `INSERT OR REPLACE INTO ${table} (${keys}) VALUES (${params})`;
    try {
      await AsyncQuery(
        sql,
        fields.map(field => field.value),
      );
    } catch (e) {
      console.log('error:', e.message);
    }
  }
}
