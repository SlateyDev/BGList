import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StorageContext} from '../context/storageContext';
import {GameList} from './GameList';

export const GameListTab = () => {
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
  });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        {(!gameList || gameList.items.length === 0) && (
          <Text style={styles.gamesListTitle}>No Games Added</Text>
        )}
        <GameList gameList={gameList} />
      </View>
    </ScrollView>
  );
};
