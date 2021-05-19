import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';
import {GameDefinition} from '../interface/gameDefinition';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

export const GameCard = (props: {game: GameDefinition}) => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          marginTop: 5,
          marginBottom: 5,
          flexDirection: 'row',
          width: '100%',
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          borderRadius: 10,
        },
        sectionContainer: {
          flexShrink: 1,
          flexGrow: 1,
          padding: 4,
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
        rating: {
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        },
      }),
    [isDarkMode],
  );

  const getRatingColour = (rating: number) => {
    switch (Math.floor(rating)) {
      case 1:
        return '#ff0000';
      case 2:
        return '#ff3366';
      case 3:
        return '#ff6699';
      case 4:
        return '#ff66cc';
      case 5:
        return '#cc99ff';
      case 6:
        return '#9999ff';
      case 7:
        return '#99ffff';
      case 8:
        return '#66ff99';
      case 9:
        return '#33cc99';
      case 10:
        return '#00cc00';
    }
    return undefined;
  };

  return (
    <TouchableHighlight
      underlayColor={isDarkMode ? Colors.darker : Colors.lighter}
      onPress={() => {
        navigation.navigate('GameDetails', {game: props.game});
      }}>
      <View style={styles.card}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {props.game.name} ({props.game.yearPublished})
          </Text>
          <Text style={styles.sectionDescription}>
            {`Players: ${props.game.minPlayers} - ${props.game.maxPlayers}`}
          </Text>
          <Text style={styles.sectionDescription}>
            {`Duration: ${props.game.minPlaytime} `}
            {props.game.minPlaytime !== props.game.maxPlaytime &&
              `- ${props.game.maxPlaytime}`}{' '}
            minutes
          </Text>
        </View>
        <View
          style={{
            ...styles.rating,
            backgroundColor: getRatingColour(props.game.rating),
          }}>
          <Text style={{textAlign: 'center'}}>
            {props.game.rating ? props.game.rating : 'Not rated'}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
