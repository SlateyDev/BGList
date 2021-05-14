import {BggRatingDefinition} from './bggRatingDefinition';

export interface BggStatsDefinition {
  maxPlayers: number;
  maxPlaytime: number;
  minPlayers: number;
  minPlaytime: number;
  numOwned: number;
  playingTime: number;
  rating: BggRatingDefinition;
}
