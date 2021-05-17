import React, {useContext} from 'react';
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
    buttonContainer: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
    },
  });

  const onShowFilter = () => {
    navigation.navigate('Filter');
  };

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.buttonContainer}>
        <Button title="Filter" onPress={() => onShowFilter()} />
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {(!gameList || gameList.items.length === 0) && (
          <Text style={styles.gamesListTitle}>No games added</Text>
        )}
        <GameList gameList={gameList} filter={route.params?.filter} />
      </ScrollView>
    </View>
  );
};
