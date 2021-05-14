import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  HomeScreen: {doLogout: () => void};
  Login: {doLogin: (username: string, password: string) => void};
};

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export type LoginNavigationProps = {
  route: LoginRouteProp;
  navigation: LoginNavigationProp;
};

export type HomeScreenNavigationProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};
