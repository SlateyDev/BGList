import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BggItemDefinition} from './bggItemDefinition';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  GameDetails: {game: BggItemDefinition};
};

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type GameDetailsScreenRouteProp = RouteProp<RootStackParamList, 'GameDetails'>;

type GameDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameDetails'
>;

export type LoginNavigationProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

export type HomeScreenNavigationProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export type GameDetailsScreenNavigationProps = {
  route: GameDetailsScreenRouteProp;
  navigation: GameDetailsScreenNavigationProp;
};
