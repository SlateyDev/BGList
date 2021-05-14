import {BggRatingValueDefinition} from './bggRatingValueDefinition';

export interface BggRatingDefinition {
  value: number | string;
  average: BggRatingValueDefinition;
  bayesianAverage: BggRatingValueDefinition;
  median: BggRatingValueDefinition;
  standardDeviation: BggRatingValueDefinition;
  usersRated: BggRatingValueDefinition;
}
