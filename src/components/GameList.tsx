import React, {useMemo} from 'react';
import {View, useColorScheme, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameCard} from './GameCard';
import {GameDefinition} from '../interface/gameDefinition';

type GameListProps = {
  gameList?: GameDefinition[];
  filter?: string;
  sort?: {key: string; desc: boolean}[];
};

export const GameList = ({filter, gameList, sort}: GameListProps) => {
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

  const filteredSortedGameList = (): GameDefinition[] => {
    const numPlayers = 6;
    let games = [...(gameList ?? [])];
    if (filter) {
      games = games.filter(
        game => game.minPlayers <= numPlayers && numPlayers <= game.maxPlayers,
      );
    }
    if (sort) {
      games.sort((game1: GameDefinition, game2: GameDefinition) => {
        for (let sortIndex = 0; sortIndex < sort.length; sortIndex++) {
          switch (sort[sortIndex].key) {
            case 'Name':
              if (game1.name < game2.name) {
                return sort[sortIndex].desc ? 1 : -1;
              } else if (game1.name > game2.name) {
                return sort[sortIndex].desc ? -1 : 1;
              }
              break;
            case 'MaxPlayers':
              if (game1.maxPlayers < game2.maxPlayers) {
                return sort[sortIndex].desc ? 1 : -1;
              } else if (game1.maxPlayers > game2.maxPlayers) {
                return sort[sortIndex].desc ? -1 : 1;
              }
              break;
            case 'Plays':
              if (game1.numPlays < game2.numPlays) {
                return sort[sortIndex].desc ? 1 : -1;
              } else if (game1.numPlays > game2.numPlays) {
                return sort[sortIndex].desc ? -1 : 1;
              }
              break;
            case 'Published':
              if (game1.yearPublished < game2.yearPublished) {
                return sort[sortIndex].desc ? 1 : -1;
              } else if (game1.yearPublished > game2.yearPublished) {
                return sort[sortIndex].desc ? -1 : 1;
              }
              break;
          }
        }
        return 0;
      });
    }
    return games;
  };

  return (
    <View style={styles.list}>
      {!!gameList &&
        filteredSortedGameList()?.map(game => (
          <GameCard key={game.objectId} game={game} />
        ))}
    </View>
  );
};
