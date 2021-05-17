import React, {useContext, useState, useRef, useMemo} from 'react';
import {StyleSheet, Text, TextInput, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LoginContext} from '../context/loginContext';
import {LoginNavigationProps} from '../interface/navigationProps';
import {StorageContext} from '../context/storageContext';

export const LoginScreen = ({navigation}: LoginNavigationProps) => {
  const {doLogin} = useContext(LoginContext);
  const {username} = useContext(StorageContext);
  const [textPassword, onChangeTextPassword] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const styles = useMemo(
    () =>
      StyleSheet.create({
        label: {
          color: isDarkMode ? 'white' : 'black',
          marginTop: 10,
          width: '100%',
          alignSelf: 'center',
        },
        value: {
          backgroundColor: isDarkMode ? Colors.dark : Colors.light,
          color: isDarkMode ? 'white' : 'black',
          width: '100%',
          alignSelf: 'center',
          height: 32,
          padding: 3,
        },
        tabContentContainer: {
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
        },
      }),
    [isDarkMode],
  );

  const passwordTextBox = useRef<TextInput>(null);

  const loginSubmit = () => {
    doLogin(username, textPassword);
    navigation.goBack();
  };

  return (
    <View style={styles.tabContentContainer}>
      <Text style={styles.label}>Username</Text>
      <Text style={{...styles.value, lineHeight: 26}}>{username}</Text>
      <Text style={styles.label}>Password</Text>
      <TextInput
        ref={passwordTextBox}
        style={styles.value}
        onChangeText={onChangeTextPassword}
        value={textPassword}
        autoCompleteType="password"
        secureTextEntry
        textContentType="password"
        onSubmitEditing={() => {
          loginSubmit();
        }}
        returnKeyType="go"
      />
    </View>
  );
};
