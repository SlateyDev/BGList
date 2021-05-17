import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from './LoginScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameDetailsScreen} from './GameDetailsScreen';

const Navigation = () => {
  const Stack = createStackNavigator();

  const isDarkMode = useColorScheme() === 'dark';
  const screenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    },
    headerTitleStyle: {
      color: isDarkMode ? Colors.white : Colors.black,
    },
    cardStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Board Game Lister'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'BGG Login'}}
        />
        <Stack.Screen
          name="Game Details"
          component={GameDetailsScreen}
          options={{title: 'Game Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
