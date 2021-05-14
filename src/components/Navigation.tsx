import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {HomeScreen} from './HomeScreen';
import {Login} from './Login';
import {LoginContext} from '../context/loginContext';

const Navigation = () => {
  const appState = useRef(AppState.currentState);
  const {checkLogin} = React.useContext(LoginContext);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

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
      if (checkLogin) {
        await checkLogin();
      }
    } else {
      console.log(`${appState.current} -> ${nextAppState}`);
    }

    appState.current = nextAppState;
    console.log(appState.current);
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'BGList'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'BGG Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
