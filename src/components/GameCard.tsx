import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {BggItemDefinition} from '../interface/bggItemDefinition';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

export const GameCard = (props: {game: BggItemDefinition}) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={Colors.white}
      onPress={() => {
        navigation.navigate('Game Details', {game: props.game});
        console.log(
          `${props.game.name.text} - num owners: ${props.game.stats?.numOwned}`,
        );
      }}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{props.game.name.text}</Text>
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

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 4,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.light,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 12,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
