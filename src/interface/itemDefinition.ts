import {NameDefinition} from './nameDefinition';
import {StatsDefinition} from './statsDefinition';
import {StatusDefinition} from './statusDefinition';

export interface ItemDefinition {
  collid?: number;
  objectid?: number;
  objecttype?: string;
  subtype?: string;

  image?: string;
  name: NameDefinition;
  numplays?: number;
  stats?: StatsDefinition;
  status?: StatusDefinition;
  thumbnail?: string;
  yearpublished?: number;
}
