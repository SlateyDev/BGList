import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BggItemDefinition} from '../interface/bggItemDefinition';

export const GameCard = (props: {game: BggItemDefinition}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{props.game.name.text}</Text>
      <Text style={styles.sectionDescription}>
        Players: {props.game.stats?.minPlayers} - {props.game.stats?.maxPlayers}
      </Text>
      <Text style={styles.sectionDescription}>
        Duration: {props.game.stats?.minPlaytime}{' '}
        {props.game.stats?.minPlaytime !== props.game.stats?.maxPlaytime &&
          `- ${props.game.stats?.maxPlaytime}`}{' '}
        minutes
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 10,
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
