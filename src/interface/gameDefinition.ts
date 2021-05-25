export interface GameDefinition {
  collectionId?: number;
  objectId: number;
  imageUri?: string;
  name: string;
  numPlays: number;

  maxPlayers: number;
  maxPlaytime: number;
  minPlayers: number;
  minPlaytime: number;
  numOwned: number;
  playingTime: number;

  rating: number;
  average: number;
  bayesianAverage: number;
  median: number;
  standardDeviation: number;
  usersRated: number;

  forTrade: boolean;
  lastModified: number;
  own: boolean;
  preOrdered: boolean;
  previouslyOwned: boolean;
  want: boolean;
  wantToBuy: boolean;
  wantToPlay: boolean;
  wishlist: boolean;
  wishlistPriority: number | undefined;

  thumbnailUri?: string;
  yearPublished: number;
}
