import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {bggSearchGames} from '../service/bggApi';
import {BggGameListDefinition} from '../interface/bggGameListDefinition';
import {GameList} from './GameList';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SwitchWithText} from './SwitchWithText';

export const GameSearchTab = () => {
  const [searchText, setSearchText] = useState('');
  const [gameList, setGameList] = useState<BggGameListDefinition | undefined>();
  const [useExact, setUseExact] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        backgroundStyle: {
          flex: 1,
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        label: {
          width: '100%',
          alignSelf: 'center',
          color: isDarkMode ? 'white' : 'black',
        },
        value: {
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          width: '100%',
          alignSelf: 'center',
          height: 32,
          padding: 3,
          color: isDarkMode ? 'white' : 'black',
        },
        tabContentContainer: {
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
        },
        searchHeader: {
          marginTop: 10,
          marginBottom: 10,
        },
        switchContainer: {
          marginTop: 10,
        },
      }),
    [isDarkMode],
  );

  const doSearch = async (exact: boolean = useExact) => {
    if (searchText.length > 0) {
      setGameList(await bggSearchGames(searchText, exact));
    } else {
      setGameList(undefined);
    }
  };

  const onUseExactValueChange = async (newValue: boolean) => {
    setUseExact(newValue);
    await doSearch(newValue);
  };

  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.tabContentContainer}>
        <View style={styles.searchHeader}>
          <Text style={styles.label}>Search</Text>
          <TextInput
            style={styles.value}
            placeholder="Search text"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={async () => {
              await doSearch();
            }}
            returnKeyType="search"
          />
          <View style={styles.switchContainer}>
            <SwitchWithText
              text="Exact"
              value={useExact}
              onValueChange={onUseExactValueChange}
            />
          </View>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <GameList gameList={gameList} />
        </ScrollView>
      </View>
    </View>
  );
};
