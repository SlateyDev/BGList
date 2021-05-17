import React, {useMemo} from 'react';
import {View, useColorScheme, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameCard} from './GameCard';
import {BggGameListDefinition} from '../interface/bggGameListDefinition';

type GameListProps = {
  gameList?: BggGameListDefinition;
  filter?: string;
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

  const filteredGameList = useMemo(() => {
    const numPlayers = 6;
    if (props.filter) {
      return props.gameList?.items.filter(
        game =>
          game.stats &&
          game.stats.minPlayers <= numPlayers &&
          numPlayers <= game.stats.maxPlayers,
      );
    }
    return props.gameList?.items;
  }, [props.gameList, props.filter]);

  return (
    <View style={styles.list}>
      {props.gameList &&
        filteredGameList?.map(game => (
          <GameCard key={game.objectId} game={game} />
        ))}
    </View>
  );
};
