import React, {useState, useMemo} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {SortModalNavigationProps} from '../interface/navigationProps';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type Item = {
  key: string;
  display: string;
  desc?: boolean;
  isHeader?: boolean;
};

const SortModal = ({navigation}: SortModalNavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        sectionContainer: {
          flex: 1,
        },
        buttonContainer: {
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        },
        sortHeaderContainer: {
          flexDirection: 'row',
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        },
        sortHeaderText: {
          fontWeight: 'bold',
          fontSize: 18,
          color: isDarkMode ? 'white' : 'black',
        },
        sortItemContainer: {
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          borderTopColor: 'white',
          borderBottomColor: 'black',
          borderTopWidth: 1,
          borderBottomWidth: 1,
        },
        sortItemText: {
          fontWeight: 'bold',
          fontSize: 24,
          color: isDarkMode ? 'white' : 'black',
          marginLeft: 10,
          flexGrow: 1,
        },
        sortAscending: {
          fontWeight: 'bold',
          fontSize: 24,
          color: isDarkMode ? 'white' : 'black',
          marginRight: 10,
        },
        dragIcon: {
          marginLeft: 10,
        },
      }),
    [isDarkMode],
  );

  const applySort = () => {
    navigation.navigate({
      name: 'GameList',
      params: {
        sort: sortData
          .slice(
            0,
            sortData.findIndex(item => item.isHeader),
          )
          .map(item => {
            return {key: item.key, desc: item.desc ?? false};
          }),
      },
    });
  };

  const [sortData, setSortData] = useState<Item[]>([
    {key: 'Name', display: 'Name'},
    {key: 'UNS', display: 'Unsorted fields', isHeader: true},
    {key: 'MaxPlayers', display: 'Max players', desc: true},
    {key: 'Plays', display: 'My plays', desc: true},
    {key: 'Published', display: 'Year published'},
  ]);

  const renderItem = ({item, drag}: RenderItemParams<Item>) => {
    return (
      <View
        style={
          !item.isHeader ? styles.sortItemContainer : styles.sortHeaderContainer
        }>
        {!item.isHeader && (
          <TouchableOpacity onPressIn={drag} style={styles.dragIcon}>
            <Icon name="menu" size={20} color="#666" />
          </TouchableOpacity>
        )}
        <Text
          style={!item.isHeader ? styles.sortItemText : styles.sortHeaderText}>
          {item.display}
        </Text>
        {!item.isHeader && (
          <TouchableOpacity>
            <Text
              style={styles.sortAscending}
              onPress={() => {
                const saveData = [...sortData];
                console.log(saveData);
                saveData.splice(saveData.indexOf(item), 1, {
                  ...item,
                  desc: !item.desc,
                });
                console.log(saveData);
                setSortData(saveData);
              }}>
              {item.desc ? 'Desc' : 'Asc'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.buttonContainer}>
        <Button title="Apply sort" onPress={() => applySort()} />
      </View>
      <View style={styles.sortHeaderContainer}>
        <Text style={styles.sortHeaderText}>Sorted fields and order</Text>
      </View>
      <DraggableFlatList
        data={sortData}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item.display}`}
        onDragEnd={({data}) => setSortData(data)}
      />
    </View>
  );
};

export default SortModal;
