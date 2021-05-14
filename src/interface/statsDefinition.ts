import {RatingDefinition} from './ratingDefinition';

export interface StatsDefinition {
  maxplayers: number;
  maxplaytime: number;
  minplayers: number;
  minplaytime: number;
  numowned: number;
  playingtime: number;
  rating: RatingDefinition;
}
