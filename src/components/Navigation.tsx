import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus, useColorScheme} from 'react-native';
import {HomeScreen} from './HomeScreen';
import {LoginScreen} from './LoginScreen';
import {LoginContext} from '../context/loginContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameDetailsScreen} from './GameDetailsScreen';

const Navigation = () => {
  const appState = useRef(AppState.currentState);
  const {login, checkLogin} = React.useContext(LoginContext);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    setTimeout(() => {
      checkLogin();
    }, 2000);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/unknown|inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log(
        `${appState.current} -> ${nextAppState} = App has come to the foreground`,
      );
      if (login.loggedIn !== 0) {
        await checkLogin();
      }
    } else {
      console.log(`${appState.current} -> ${nextAppState}`);
    }

    appState.current = nextAppState;
    console.log(appState.current);
  };

  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Board Game Lister',
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.dark : Colors.light,
            },
            headerTitleStyle: {
              color: isDarkMode ? Colors.white : Colors.black,
            },
            cardStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'BGG Login',
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.dark : Colors.light,
            },
            headerTitleStyle: {
              color: isDarkMode ? Colors.white : Colors.black,
            },
            cardStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
        <Stack.Screen
          name="Game Details"
          component={GameDetailsScreen}
          options={{
            title: 'Game Details',
            headerStyle: {
              backgroundColor: isDarkMode ? Colors.dark : Colors.light,
            },
            headerTitleStyle: {
              color: isDarkMode ? Colors.white : Colors.black,
            },
            cardStyle: {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
