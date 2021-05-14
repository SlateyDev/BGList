import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LoginContext} from '../context/loginContext';
import {GameCard} from './GameCard';
import {HomeScreenNavigationProps} from '../interface/navigationProps';
import {bggGetGameList} from '../service/bggApi';
import {StorageContext} from '../context/storageContext';

export const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const {updateGameList, gameList} = useContext(StorageContext);
  const {login, doLogout} = useContext(LoginContext);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const syncGameList = async (username: string) => {
    const retrievedGameList = await bggGetGameList(username);
    if (retrievedGameList) {
      updateGameList(retrievedGameList);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          {login.loggedIn === 0 && (
            <>
              <Text>Checking Login...</Text>
              <ActivityIndicator />
            </>
          )}
          {login.loggedIn < 0 && (
            <>
              <Button
                onPress={() => {
                  navigation.navigate('Login');
                }}
                title="Login"
              />
            </>
          )}
          {login.loggedIn > 0 && (
            <>
              <Button
                onPress={() => {
                  doLogout();
                }}
                title="Logout"
              />
              <Text>Logged in as: {login.username}</Text>
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                {gameList && gameList.items.length > 0 && (
                  <Text style={styles.gamesListTitle}>Games List</Text>
                )}
                {gameList &&
                  gameList.items.map(game => (
                    <GameCard key={game.collId} game={game} />
                  ))}
                <Button
                  onPress={async () => {
                    await syncGameList(login.username);
                  }}
                  title="Get Games List"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gamesListTitle: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
  },
});
