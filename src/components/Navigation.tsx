import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useColorScheme} from 'react-native';
import {LoginScreen} from './LoginScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameDetailsScreen} from './GameDetailsScreen';
import {AccountTab} from './AccountTab';
import {GameListTab} from './GameListTab';
import {GameSearchTab} from './GameSearchTab';
import FilterModal from './FilterModal';

const Navigation = () => {
  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const isDarkMode = useColorScheme() === 'dark';
  const screenOptions: StackNavigationOptions = {
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
        <Stack.Screen name="Home" options={{title: 'Board Game Lister'}}>
          {() => (
            <Tabs.Navigator>
              <Tabs.Screen name="Account" component={AccountTab} />
              <Tabs.Screen
                name="GameList"
                component={GameListTab}
                options={{title: 'List'}}
              />
              <Tabs.Screen name="Search" component={GameSearchTab} />
            </Tabs.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'BGG Login'}}
        />
        <Stack.Screen
          name="GameDetails"
          component={GameDetailsScreen}
          options={{title: 'Game Details'}}
        />
        <Stack.Screen
          name="Filter"
          component={FilterModal}
          options={{headerBackTitle: 'Back'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
