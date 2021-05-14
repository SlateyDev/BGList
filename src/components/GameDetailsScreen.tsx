import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GameDetailsScreenNavigationProps} from '../interface/navigationProps';

export const GameDetailsScreen = ({
  route,
}: GameDetailsScreenNavigationProps) => {
  console.log(route);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.sectionTitle}>{route.params.game.name.text}</Text>
        <Image
          style={styles.gameImage}
          source={{uri: route.params.game.image}}
        />
        <Text style={styles.sectionDetail}>
          {`Players: ${route.params.game.stats?.minPlayers} - ${route.params.game.stats?.maxPlayers}`}
        </Text>
        <Text style={styles.sectionDetail}>
          {`Duration: ${route.params.game.stats?.minPlaytime} `}
          {route.params.game.stats?.minPlaytime !==
            route.params.game.stats?.maxPlaytime &&
            `- ${route.params.game.stats?.maxPlaytime}`}{' '}
          minutes
        </Text>
        <Text style={styles.sectionDetail}>
          Year Published - {route.params.game.yearPublished}
        </Text>
        <Text style={styles.sectionDetail}>
          Times Played - {route.params.game.numPlays}
        </Text>
        <Text style={styles.sectionDetail}>
          Owned = {route.params.game.status?.own ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          {`Previously owned = ${
            route.params.game.status?.previouslyOwned ? 'Yes' : 'No'
          }`}
        </Text>
        <Text style={styles.sectionDetail}>
          For trade = {route.params.game.status?.forTrade ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Want in trade = {route.params.game.status?.want ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Want to play = {route.params.game.status?.wantToPlay ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Want to buy = {route.params.game.status?.wantToBuy ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Pre-ordered = {route.params.game.status?.preOrdered ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Wishlist = {route.params.game.status?.wishlist ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.sectionDetail}>
          Number of owners in BGG = {route.params.game.stats?.numOwned}
        </Text>
        <Text style={styles.sectionDetail}>
          Your Rating = {route.params.game.stats?.rating.value}
        </Text>
        <Text style={styles.sectionDetail}>
          Average Rating = {route.params.game.stats?.rating.average.value}
        </Text>
        <Text style={styles.sectionDetail}>
          Number of ratings = {route.params.game.stats?.rating.usersRated.value}
        </Text>
        <Text style={styles.sectionDetail}>
          {`Std. Deviation = ${route.params.game.stats?.rating.standardDeviation.value}`}
        </Text>
        <Text style={styles.sectionDetail}>
          {`Bayesian Average Rating = ${route.params.game.stats?.rating.bayesianAverage.value}`}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  },
  sectionDetail: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
