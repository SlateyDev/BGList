import {RatingValueDefinition} from './ratingValueDefinition';

export interface RatingDefinition {
  value: number | string;
  average: RatingValueDefinition;
  bayesaverage: RatingValueDefinition;
  median: RatingValueDefinition;
  stddev: RatingValueDefinition;
  usersrated: RatingValueDefinition;
}
