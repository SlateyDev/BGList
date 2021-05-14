import {BggItemDefinition} from './bggItemDefinition';

export interface BggGameListDefinition {
  totalItems: number;
  termsOfUse?: string;
  pubDate?: Date;
  items: BggItemDefinition[];
}
