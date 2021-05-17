import React, {useMemo} from 'react';
import {View, useColorScheme, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameCard} from './GameCard';
import {BggGameListDefinition} from '../interface/bggGameListDefinition';

type GameListProps = {
  gameList?: BggGameListDefinition;
};

export const GameList = (props: GameListProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        list: {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }),
    [isDarkMode],
  );

  return (
    <View style={styles.list}>
      {props.gameList &&
        props.gameList.items.map(game => (
          <GameCard key={game.objectId} game={game} />
        ))}
    </View>
  );
};
