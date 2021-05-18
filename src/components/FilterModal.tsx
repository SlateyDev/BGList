import React, {useMemo} from 'react';
import {View, Button, useColorScheme, StyleSheet} from 'react-native';
import {FilterModalNavigationProps} from '../interface/navigationProps';

const FilterModal = ({navigation}: FilterModalNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonContainer: {
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
      }),
    [isDarkMode],
  );

  const applyFilter = () => {
    navigation.navigate({name: 'GameList', params: {filter: 'new filter'}});
  };

  const clearFilter = () => {
    navigation.navigate({name: 'GameList', params: {filter: undefined}});
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button title="Apply filter" onPress={() => applyFilter()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Clear filter" onPress={() => clearFilter()} />
      </View>
    </View>
  );
};

export default FilterModal;
