import {parse} from 'fast-xml-parser';
import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LoginContext} from '../context/loginContext';
import {ItemDefinition} from '../interface/itemDefinition';
import {GameCard} from './GameCard';
import {HomeScreenNavigationProps} from '../interface/navigationProps';

const MyHeader: React.FC<{}> = ({}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[{color: Colors.white}]}>Test</Text>
    </View>
  );
};

export const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {login, doLogout} = useContext(LoginContext);
  const [gameList, setGameList] = useState<ItemDefinition[]>([]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const syncGameList = async (username: string) => {
    try {
      const response = await fetch(
        `https://www.boardgamegeek.com/xmlapi/collection/${username}`,
        {
          method: 'GET',
        },
      );

      const responseXml = await response.text();
      const responseData = parse(responseXml, {
        ignoreAttributes: false,
        allowBooleanAttributes: true,
      });
      console.log(responseData.items['@_totalitems']);
      console.log(responseData.items['@_termsofuse']);
      console.log(responseData.items['@_pubdate']);
      const items: ItemDefinition[] = responseData.items.item.map(
        (item: any) => {
          return {
            collid: item['@_collid'],
            objectid: item['@_objectid'],
            objecttype: item['@_objecttype'],
            subtype: item['@_subtype'],
            image: item.image,
            name: {
              text: item.name['#text'],
              sortindex: item.name['@_sortindex'],
            },
            numplays: item.numplays,
            stats: {
              maxplayers: item.stats['@_maxplayers'],
              maxplaytime: item.stats['@_maxplaytime'],
              minplayers: item.stats['@_minplayers'],
              minplaytime: item.stats['@_minplaytime'],
              numowned: item.stats['@_numowned'],
              playingtime: item.stats['@_playingtime'],
              rating: {
                value: item.stats.rating['@_value'],
                average: {
                  value: item.stats.rating.average['@_value'],
                },
                bayesaverage: {
                  value: item.stats.rating.bayesaverage['@_value'],
                },
                median: {
                  value: item.stats.rating.median['@_value'],
                },
                stddev: {
                  value: item.stats.rating.stddev['@_value'],
                },
                usersrated: {
                  value: item.stats.rating.usersrated['@_value'],
                },
              },
            },
            status: {
              fortrade: item.status['@_fortrade'],
              lastmodified: item.status['@_lastmodified'],
              own: item.status['@_own'],
              preordered: item.status['@_preordered'],
              prevowned: item.status['@_prevowned'],
              want: item.status['@_want'],
              wanttobuy: item.status['@_wanttobuy'],
              wanttoplay: item.status['@_wanttoplay'],
              wishlist: item.status['@_wishlist'],
              wishlistpriority: item.status['@_wishlistpriority'],
            },
            thumbnail: item.thumbnail,
            yearpublished: item.yearpublished,
          };
        },
      );
      console.log(items);
      setGameList(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <MyHeader />
        <View>
          {login && login.loggedIn <= 0 && (
            <>
              {login.loggedIn === 0 && <ActivityIndicator />}
              <Button
                onPress={() => {
                  navigation.navigate('Login');
                }}
                title="Login"
              />
            </>
          )}
          {login && login.loggedIn === 1 && (
            <Button
              onPress={() => {
                if (doLogout) {
                  doLogout();
                }
              }}
              title="Logout"
            />
          )}
          {login && login.loggedIn === 1 && (
            <Text>Logged in as: {login.username}</Text>
          )}
          {login && login.loggedIn === -1 && <Text>Not logged in</Text>}
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            {gameList.map(game => (
              <GameCard key={game.collid} game={game} />
            ))}
            <Button
              onPress={() => {
                if (login) {
                  syncGameList(login.username);
                }
              }}
              title="Get Games List"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 24,
    height: 32,
    backgroundColor: 'gray',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  loginLabel: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  loginTextBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.dark,
    width: '80%',
    alignSelf: 'center',
    height: 32,
    padding: 3,
  },
});
