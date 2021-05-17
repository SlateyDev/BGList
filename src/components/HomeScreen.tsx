import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GameListTab} from './GameListTab';
import {GameSearchTab} from './GameSearchTab';
import {AccountTab} from './AccountTab';

export const HomeScreen = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Account" component={AccountTab} />
      <Tabs.Screen name="List" component={GameListTab} />
      <Tabs.Screen name="Search" component={GameSearchTab} />
    </Tabs.Navigator>
  );
};
