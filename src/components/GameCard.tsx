import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import {BggItemDefinition} from '../interface/bggItemDefinition';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

export const GameCard = (props: {game: BggItemDefinition}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        sectionContainer: {
          padding: 4,
          marginTop: 5,
          marginBottom: 5,
          width: '100%',
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          borderRadius: 10,
        },
        sectionTitle: {
          fontSize: 18,
          fontWeight: '600',
          color: isDarkMode ? 'white' : 'black',
        },
        sectionDescription: {
          fontSize: 12,
          fontWeight: '400',
          color: isDarkMode ? 'white' : 'black',
        },
        highlight: {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
      }),
    [isDarkMode],
  );

  return (
    <TouchableHighlight
      underlayColor={isDarkMode ? Colors.darker : Colors.lighter}
      onPress={() => {
        navigation.navigate('Game Details', {game: props.game});
      }}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {props.game.name.text} ({props.game.yearPublished})
        </Text>
        <Text style={styles.sectionDescription}>
          {`Players: ${props.game.stats?.minPlayers} - ${props.game.stats?.maxPlayers}`}
        </Text>
        <Text style={styles.sectionDescription}>
          {`Duration: ${props.game.stats?.minPlaytime} `}
          {props.game.stats?.minPlaytime !== props.game.stats?.maxPlaytime &&
            `- ${props.game.stats?.maxPlaytime}`}{' '}
          minutes
        </Text>
      </View>
    </TouchableHighlight>
  );
};
