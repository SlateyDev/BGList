import React from 'react';
import {View, Button} from 'react-native';
import {FilterModalNavigationProps} from '../interface/navigationProps';

const FilterModal = ({navigation}: FilterModalNavigationProps) => {
  const applyFilter = () => {
    navigation.navigate({name: 'GameList', params: {filter: 'new filter'}});
  };

  const clearFilter = () => {
    navigation.navigate({name: 'GameList', params: {filter: undefined}});
  };

  return (
    <View>
      <Button title="Apply filter" onPress={() => applyFilter()} />
      <Button title="Clear filter" onPress={() => clearFilter()} />
    </View>
  );
};

export default FilterModal;
