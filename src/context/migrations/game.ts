const migration = {
  name: 'game-v1',
  up: [
    // 'DROP TABLE IF EXISTS game',
    'CREATE TABLE IF NOT EXISTS game (Id INTEGER PRIMARY KEY, CollectionId)',
  ],
};

export default migration;
