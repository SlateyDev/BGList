import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemDefinition} from '../interface/itemDefinition';

export const GameCard = (props: {game: ItemDefinition}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{props.game.name.text}</Text>
      <Text style={styles.sectionDescription}>
        Players: {props.game.stats?.minplayers} - {props.game.stats?.maxplayers}
      </Text>
      <Text style={styles.sectionDescription}>
        Duration: {props.game.stats?.minplaytime}{' '}
        {props.game.stats?.minplaytime !== props.game.stats?.maxplaytime &&
          `- ${props.game.stats?.maxplaytime}`}{' '}
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
