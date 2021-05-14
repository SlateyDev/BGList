import {BggNameDefinition} from './bggNameDefinition';
import {BggStatsDefinition} from './bggStatsDefinition';
import {BggStatusDefinition} from './bggStatusDefinition';

export interface BggItemDefinition {
  collId?: number;
  objectId?: number;
  objectType?: string;
  subType?: string;

  image?: string;
  name: BggNameDefinition;
  numPlays?: number;
  stats?: BggStatsDefinition;
  status?: BggStatusDefinition;
  thumbnail?: string;
  yearPublished?: number;
}
