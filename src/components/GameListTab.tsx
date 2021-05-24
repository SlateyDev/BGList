import React, {useContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StorageContext} from '../context/storageContext';
import {GameList} from './GameList';
import {GameListTabNavigationProps} from '../interface/navigationProps';

export const GameListTab = ({
  navigation,
  route,
}: GameListTabNavigationProps) => {
  const {gameList} = useContext(StorageContext);

  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    backgroundStyle: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    gamesListTitle: {
      alignSelf: 'center',
      fontWeight: '700',
      fontSize: 22,
      marginTop: 10,
      marginBottom: 10,
    },
    groupedButtonsContainer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      flex: 1,
    },
  });

  const onShowFilter = () => {
    navigation.navigate('Filter');
  };

  const onShowSort = () => {
    navigation.navigate('Sort');
  };

  useEffect(() => {
    console.log('route params', route.params);
  }, [route.params]);

  return (
    <View style={styles.backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {gameList.length === 0 && (
          <Text style={styles.gamesListTitle}>No games added</Text>
        )}
        <GameList
          gameList={gameList}
          filter={route.params?.filter}
          sort={route.params?.sort}
        />
      </ScrollView>
      <View style={styles.groupedButtonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Filter" onPress={() => onShowFilter()} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sort" onPress={() => onShowSort()} />
        </View>
      </View>
    </View>
  );
};
