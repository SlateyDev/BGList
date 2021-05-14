import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BggItemDefinition} from './bggItemDefinition';

type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  GameDetailsScreen: {game: BggItemDefinition};
};

type LoginRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

type LoginNavigationProp = StackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type GameDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'GameDetailsScreen'
>;

type GameDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameDetailsScreen'
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
