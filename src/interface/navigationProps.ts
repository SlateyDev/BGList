import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GameDefinition} from './gameDefinition';

type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  GameList: {filter?: string; sort?: {key: string; desc: boolean}[]};
  GameSearch: undefined;
  Login: undefined;
  GameDetails: {game: GameDefinition};
  Filter: undefined;
  Sort: undefined;
};

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type HomeScreenNavigationProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type AccountScreenRouteProp = RouteProp<RootStackParamList, 'Account'>;
export type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Account'
>;
export type AccountScreenNavigationProps = {
  route: AccountScreenRouteProp;
  navigation: AccountScreenNavigationProp;
};

export type GameListRouteProp = RouteProp<RootStackParamList, 'GameList'>;
export type GameListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameList'
>;
export type GameListTabNavigationProps = {
  route: GameListRouteProp;
  navigation: GameListNavigationProp;
};

export type GameSearchRouteProp = RouteProp<RootStackParamList, 'GameSearch'>;
export type GameSearchNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameSearch'
>;
export type GameSearchNavigationProps = {
  route: GameSearchRouteProp;
  navigation: GameSearchNavigationProp;
};

export type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type LoginNavigationProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

export type GameDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'GameDetails'
>;
export type GameDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameDetails'
>;
export type GameDetailsScreenNavigationProps = {
  route: GameDetailsScreenRouteProp;
  navigation: GameDetailsScreenNavigationProp;
};

export type FilterRouteProp = RouteProp<RootStackParamList, 'Filter'>;
export type FilterNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Filter'
>;
export type FilterModalNavigationProps = {
  route: FilterRouteProp;
  navigation: FilterNavigationProp;
};

export type SortRouteProp = RouteProp<RootStackParamList, 'Sort'>;
export type SortNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sort'
>;
export type SortModalNavigationProps = {
  route: SortRouteProp;
  navigation: SortNavigationProp;
};
