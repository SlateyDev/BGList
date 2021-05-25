const migration = {
  name: 'game-v1',
  up: [
    'CREATE TABLE IF NOT EXISTS game (' +
      'objectId INTEGER PRIMARY KEY,' +
      'collectionId INTEGER,' +
      'imageUri TEXT,' +
      'name TEXT,' +
      'numPlays INTEGER,' +
      'maxPlayers INTEGER,' +
      'minPlayers INTEGER,' +
      'maxPlaytime INTEGER,' +
      'minPlaytime INTEGER,' +
      'numOwned INTEGER,' +
      'playingTime INTEGER,' +
      'rating DECIMAL,' +
      'average DECIMAL,' +
      'bayesianAverage DECIMAL,' +
      'median DECIMAL,' +
      'standardDeviation DECIMAL,' +
      'usersRated INTEGER,' +
      'forTrade BIT,' +
      'lastModified INTEGER,' +
      'own BIT,' +
      'preOrdered BIT,' +
      'previouslyOwned BIT,' +
      'want BIT,' +
      'wantToBuy BIT,' +
      'wantToPlay BIT,' +
      'wishlist BIT,' +
      'wishlistPriority INTEGER,' +
      'thumbnailUri TEXT,' +
      'yearPublished INTEGER)',
  ],
};

export default migration;
