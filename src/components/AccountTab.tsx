import React, {useContext, useState, useEffect, useMemo} from 'react';
import {
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StorageContext} from '../context/storageContext';
import {bggGetGameList} from '../service/bggApi';
import {SwitchWithText} from './SwitchWithText';
import {HomeScreenNavigationProps} from '../interface/navigationProps';

export const AccountTab = ({navigation}: HomeScreenNavigationProps) => {
  const {updateGameList, username, updateUsername} = useContext(StorageContext);
  const [textEntryUsername, setTextEntryUsername] = useState('');
  const [getGameListEnabled, setGetGameListEnabled] = useState(true);
  const [getPlaysEnabled, setGetPlaysEnabled] = useState(true);
  const [updateGameStatusEnabled, setUpdateGameStatusEnabled] = useState(true);
  const [updateGameRatingsEnabled, setUpdateGameRatingEnabled] = useState(true);
  const [updateGameVersionsEnabled, setUpdateGameVersionsEnabled] =
    useState(true);
  const [updateGameCommentsEnabled, setUpdateGameCommentsEnabled] =
    useState(true);
  const [updateDeletedGamesEnabled, setUpdateDeletedGamesEnabled] =
    useState(true);
  const [updateAddedPlaysEnabled, setUpdateAddedPlaysEnabled] = useState(true);
  const [updateEditedPlaysEnabled, setUpdateEditedPlaysEnabled] =
    useState(true);
  const [updateDeletedPlaysEnabled, setUpdateDeletedPlaysEnabled] =
    useState(true);

  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        backgroundStyle: {
          flex: 1,
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        label: {
          marginTop: 10,
          width: '100%',
          alignSelf: 'center',
          color: isDarkMode ? 'white' : 'black',
          fontWeight: '700',
        },
        value: {
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          width: '100%',
          alignSelf: 'center',
          height: 32,
          padding: 3,
          color: isDarkMode ? 'white' : 'black',
        },
        group: {
          marginTop: 5,
          marginBottom: 5,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          borderRadius: 10,
        },
        buttonContainer: {
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5,
        },
        switchContainer: {
          marginLeft: 10,
          marginTop: 5,
          marginBottom: 5,
        },
        tabContentContainer: {
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }),
    [isDarkMode],
  );

  useEffect(() => {
    setTextEntryUsername(username);
  }, [username]);

  const syncFromBGG = async () => {
    if (textEntryUsername !== username) {
      updateUsername(username);
    }
    const retrievedGameList = await bggGetGameList(textEntryUsername);
    if (retrievedGameList) {
      updateGameList(retrievedGameList);
    }
  };

  const syncToBGG = async () => {
    navigation.navigate('Login');
  };

  const clearData = async () => {
    updateGameList({totalItems: 0, items: []});
  };

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.tabContentContainer}>
        <Text style={styles.label}>BGG Username</Text>
        <TextInput
          style={styles.value}
          onChangeText={setTextEntryUsername}
          placeholder="Enter username"
          value={textEntryUsername}
          onSubmitEditing={() => updateUsername(textEntryUsername)}
          returnKeyType="done"
        />
        <Text style={styles.label}>Sync Options</Text>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.group}>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Overwrite games list"
                value={getGameListEnabled}
                onValueChange={setGetGameListEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Retrieve plays (Requires login)"
                value={getPlaysEnabled}
                onValueChange={setGetPlaysEnabled}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sync data from BGG"
                onPress={() => syncFromBGG()}
                disabled={!username || username !== textEntryUsername}
              />
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Add/Update game status"
                value={updateGameStatusEnabled}
                onValueChange={setUpdateGameStatusEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Add/Update game ratings"
                value={updateGameRatingsEnabled}
                onValueChange={setUpdateGameRatingEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Add/Update game versions"
                value={updateGameVersionsEnabled}
                onValueChange={setUpdateGameVersionsEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Add/Update game comments"
                value={updateGameCommentsEnabled}
                onValueChange={setUpdateGameCommentsEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Deleted games"
                value={updateDeletedGamesEnabled}
                onValueChange={setUpdateDeletedGamesEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Added plays"
                value={updateAddedPlaysEnabled}
                onValueChange={setUpdateAddedPlaysEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Edited plays"
                value={updateEditedPlaysEnabled}
                onValueChange={setUpdateEditedPlaysEnabled}
              />
            </View>
            <View style={styles.switchContainer}>
              <SwitchWithText
                text="Deleted plays"
                value={updateDeletedPlaysEnabled}
                onValueChange={setUpdateDeletedPlaysEnabled}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Sync data to BGG (Requires login)"
                onPress={() => syncToBGG()}
                disabled={!username || username !== textEntryUsername}
              />
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.buttonContainer}>
              <Button title="Clear game data" onPress={() => clearData()} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
