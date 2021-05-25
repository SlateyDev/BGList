import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  ScrollView,
  Image,
} from 'react-native';
import {GameDetailsScreenNavigationProps} from '../interface/navigationProps';

export const GameDetailsScreen = ({
  route,
}: GameDetailsScreenNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        gameImage: {
          alignSelf: 'center',
          width: '90%',
          height: 200,
          resizeMode: 'contain',
        },
        sectionTitle: {
          marginTop: 10,
          fontSize: 20,
          fontWeight: '700',
          alignSelf: 'center',
          color: isDarkMode ? 'white' : 'black',
        },
        sectionDetail: {
          marginLeft: 10,
          fontSize: 12,
          fontWeight: '400',
          color: isDarkMode ? 'white' : 'black',
        },
      }),
    [isDarkMode],
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.sectionTitle}>{route.params.game.name}</Text>
      <Image
        style={styles.gameImage}
        source={{uri: route.params.game.imageUri}}
      />
      <Text style={styles.sectionDetail}>
        {`Players: ${route.params.game.minPlayers} - ${route.params.game.maxPlayers}`}
      </Text>
      <Text style={styles.sectionDetail}>
        {`Duration: ${route.params.game.minPlaytime} `}
        {route.params.game.minPlaytime !== route.params.game.maxPlaytime &&
          `- ${route.params.game.maxPlaytime}`}{' '}
        minutes
      </Text>
      <Text style={styles.sectionDetail}>
        Year Published - {route.params.game.yearPublished}
      </Text>
      <Text style={styles.sectionDetail}>
        Times Played - {route.params.game.numPlays}
      </Text>
      <Text style={styles.sectionDetail}>
        Owned = {route.params.game.own ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        {`Previously owned = ${
          route.params.game.previouslyOwned ? 'Yes' : 'No'
        }`}
      </Text>
      <Text style={styles.sectionDetail}>
        {`Last Modified = ${new Date(
          route.params.game.lastModified,
        ).toLocaleString()}`}
      </Text>
      <Text style={styles.sectionDetail}>
        For trade = {route.params.game.forTrade ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Want in trade = {route.params.game.want ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Want to play = {route.params.game.wantToPlay ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Want to buy = {route.params.game.wantToBuy ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Pre-ordered = {route.params.game.preOrdered ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Wishlist = {route.params.game.wishlist ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.sectionDetail}>
        Number of owners in BGG = {route.params.game.numOwned}
      </Text>
      <Text style={styles.sectionDetail}>
        Your Rating = {route.params.game.rating}
      </Text>
      <Text style={styles.sectionDetail}>
        Average Rating = {route.params.game.average}
      </Text>
      <Text style={styles.sectionDetail}>
        Number of ratings = {route.params.game.usersRated}
      </Text>
      <Text style={styles.sectionDetail}>
        {`Std. Deviation = ${route.params.game.standardDeviation}`}
      </Text>
      <Text style={styles.sectionDetail}>
        {`Bayesian Average Rating = ${route.params.game.bayesianAverage}`}
      </Text>
    </ScrollView>
  );
};
