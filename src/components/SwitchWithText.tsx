import {View, Switch, Text, StyleSheet, useColorScheme} from 'react-native';
import React, {useMemo} from 'react';

export const SwitchWithText = (props: {
  text: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        switchContainer: {
          flexDirection: 'row',
        },
        switchText: {
          color: isDarkMode ? 'white' : 'black',
          marginTop: 5,
          marginLeft: 5,
        },
      }),
    [isDarkMode],
  );

  return (
    <View style={styles.switchContainer}>
      <Switch value={props.value} onValueChange={props.onValueChange} />
      <Text style={styles.switchText}>{props.text}</Text>
    </View>
  );
};
